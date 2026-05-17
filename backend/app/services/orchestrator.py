import concurrent.futures
import logging
from typing import Dict, Any

from app.services.gemini_client import GeminiClient
from app.services.agents.core_agents import (
    ParserAgent, ClassificationAgent, RiskAgent, 
    ConsequenceAgent, NegotiationAgent, ExplainabilityAgent
)

logger = logging.getLogger(__name__)

class AIOrchestrator:
    def __init__(self):
        self.client = GeminiClient()
        self.parser = ParserAgent(self.client)
        self.classifier = ClassificationAgent(self.client)
        self.risk_assessor = RiskAgent(self.client)
        self.simulator = ConsequenceAgent(self.client)
        self.negotiator = NegotiationAgent(self.client)
        self.explainer = ExplainabilityAgent(self.client)

    def process_clause(self, clause: dict, cache: dict) -> dict:
        """Processes a single clause through the pipeline, utilizing an O(1) cache."""
        original_text = clause.get("original_text", "")
        clause_id = clause.get("id", "unknown")
        
        # O(1) Cache Lookup
        text_hash = hash(original_text.strip())
        if text_hash in cache:
            logger.info(f"Cache hit for clause {clause_id} (O(1) optimization)")
            cached_result = cache[text_hash].copy()
            cached_result["id"] = clause_id # Ensure unique ID per instance
            return cached_result
            
        try:
            # 1. Classify
            class_data = self.classifier.classify(original_text)
            category = class_data.get("category", "General")
            
            # 2. Risk Assess
            risk_data = self.risk_assessor.analyze(category, original_text)
            severity = risk_data.get("severity", "safe").lower()

            final_clause = {
                "id": clause_id,
                "original_text": original_text,
                "category": category,
                "is_standard": class_data.get("is_standard", True),
                "risk_assessment": risk_data,
                "consequence": None,
                "negotiation": None,
                "explainability": None
            }

            # 3. Fan-out for high/critical risks
            if severity in ["high", "critical"]:
                with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
                    fut_sim = executor.submit(self.simulator.simulate, original_text)
                    fut_neg = executor.submit(self.negotiator.recommend, original_text)
                    fut_exp = executor.submit(self.explainer.explain, original_text)
                    
                    final_clause["consequence"] = fut_sim.result()
                    final_clause["negotiation"] = fut_neg.result()
                    final_clause["explainability"] = fut_exp.result()
            else:
                # Still get a plain English explanation even if safe
                final_clause["explainability"] = self.explainer.explain(original_text)
                
            # Store in cache
            cache[text_hash] = final_clause.copy()
                
            return final_clause
        except Exception as e:
            logger.error(f"Error processing clause {clause_id}: {e}")
            return {
                "id": clause_id,
                "original_text": original_text,
                "error": str(e)
            }

    def analyze_document(self, document_text: str, analysis_id: str, filename: str) -> dict:
        """Main entry point for full document analysis."""
        logger.info(f"Starting analysis {analysis_id} for {filename}")
        
        # 1. Parse into clauses
        parsed_doc = self.parser.parse(document_text)
        clauses = parsed_doc.get("clauses", [])
        
        if not clauses:
            # Fallback if parser fails to output a list
            clauses = [{"id": "clause_1", "original_text": document_text[:1000]}]

        final_clauses = []
        overall_risk_score = "safe"
        
        # O(1) Cache for identical clauses across the document
        clause_cache = {}
        
        # 2. Process clauses concurrently
        # Limit max_workers to avoid hitting Gemini rate limits instantly on long docs
        with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
            future_to_clause = {executor.submit(self.process_clause, c, clause_cache): c for c in clauses}
            for future in concurrent.futures.as_completed(future_to_clause):
                res = future.result()
                final_clauses.append(res)
                
                # Update overall risk
                severity = res.get("risk_assessment", {}).get("severity", "safe").lower()
                if severity == "critical":
                    overall_risk_score = "critical"
                elif severity == "high" and overall_risk_score != "critical":
                    overall_risk_score = "high"
                elif severity == "moderate" and overall_risk_score not in ["critical", "high"]:
                    overall_risk_score = "moderate"

        # 3. Construct final report
        report = {
            "analysis_id": analysis_id,
            "filename": filename,
            "overall_risk_score": overall_risk_score,
            "summary": f"Analyzed {len(final_clauses)} clauses. Highest risk found: {overall_risk_score.upper()}.",
            "clauses": final_clauses
        }
        
        logger.info(f"Finished analysis {analysis_id}")
        return report
