from app.services.gemini_client import GeminiClient
from app.services.prompts import templates
from app.models.analysis import (
    ParsedDocument, ClassifiedClause, RiskAssessment, 
    ConsequenceSimulation, NegotiationStrategy, Explainability
)

class ParserAgent:
    def __init__(self, client: GeminiClient):
        self.client = client

    def parse(self, document_text: str) -> dict:
        prompt = templates.PARSER_PROMPT.format(document_text=document_text)
        return self.client.generate_json(prompt, ParsedDocument)

class ClassificationAgent:
    def __init__(self, client: GeminiClient):
        self.client = client

    def classify(self, clause_text: str) -> dict:
        prompt = templates.CLASSIFIER_PROMPT.format(clause_text=clause_text)
        return self.client.generate_json(prompt, ClassifiedClause)

class RiskAgent:
    def __init__(self, client: GeminiClient):
        self.client = client

    def analyze(self, category: str, clause_text: str) -> dict:
        prompt = templates.RISK_PROMPT.format(category=category, clause_text=clause_text)
        return self.client.generate_json(prompt, RiskAssessment)

class ConsequenceAgent:
    def __init__(self, client: GeminiClient):
        self.client = client

    def simulate(self, clause_text: str) -> dict:
        prompt = templates.CONSEQUENCE_PROMPT.format(clause_text=clause_text)
        return self.client.generate_json(prompt, ConsequenceSimulation)

class NegotiationAgent:
    def __init__(self, client: GeminiClient):
        self.client = client

    def recommend(self, clause_text: str) -> dict:
        prompt = templates.NEGOTIATION_PROMPT.format(clause_text=clause_text)
        return self.client.generate_json(prompt, NegotiationStrategy)

class ExplainabilityAgent:
    def __init__(self, client: GeminiClient):
        self.client = client

    def explain(self, clause_text: str) -> dict:
        prompt = templates.EXPLAINABILITY_PROMPT.format(clause_text=clause_text)
        return self.client.generate_json(prompt, Explainability)
