from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class BaseClause(BaseModel):
    id: str
    original_text: str

class ParsedDocument(BaseModel):
    clauses: List[BaseClause]
    metadata: Dict[str, Any] = {}

class ClassifiedClause(BaseClause):
    category: str
    is_standard: bool

class RiskAssessment(BaseModel):
    severity: str = Field(description="One of: safe, moderate, high, critical")
    risk_drivers: List[str] = Field(description="List of specific reasons for this risk score")

class RiskAnalyzedClause(ClassifiedClause):
    risk_assessment: RiskAssessment

class ConsequenceSimulation(BaseModel):
    worst_case_scenario: str
    business_impact: str
    financial_exposure: str

class NegotiationStrategy(BaseModel):
    redline_suggestion: str
    explanation: str
    fallback_position: str

class Explainability(BaseModel):
    plain_english_summary: str
    key_takeaways: List[str]

class FinalClauseAnalysis(RiskAnalyzedClause):
    consequence: Optional[ConsequenceSimulation] = None
    negotiation: Optional[NegotiationStrategy] = None
    explainability: Optional[Explainability] = None

class DocumentAnalysisReport(BaseModel):
    analysis_id: str
    filename: str
    summary: str
    overall_risk_score: str
    clauses: List[FinalClauseAnalysis]
