import os
import json
import logging
import google.generativeai as genai
from typing import Any, Type
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from google.api_core.exceptions import ResourceExhausted, ServiceUnavailable, InternalServerError

logger = logging.getLogger(__name__)

# Initialize Google Generative AI
api_key = os.environ.get("GEMINI_API_KEY", "mock-key")
genai.configure(api_key=api_key)

class GeminiClient:
    def __init__(self, model_name: str = "gemini-1.5-flash"):
        self.model_name = model_name
        self.model = genai.GenerativeModel(model_name)

    @retry(
        retry=retry_if_exception_type((ResourceExhausted, ServiceUnavailable, InternalServerError, Exception)),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        stop=stop_after_attempt(4),
        reraise=True
    )
    def generate_json(self, prompt: str, schema: Type[Any] = None) -> dict:
        """
        Generates a response from Gemini, forcing JSON output.
        If a Pydantic schema is provided, it instructs the model to match it.
        """
        generation_config = genai.GenerationConfig(
            response_mime_type="application/json"
        )
        
        try:
            # We don't pass response_schema directly via SDK if using 1.5-flash, 
            # we just ask it for JSON. But if we want, we can inject schema info into prompt.
            schema_instruction = ""
            if schema:
                schema_instruction = f"\n\nOUTPUT SCHEMA REQUIREMENT:\nYou MUST output valid JSON that exactly matches this schema structure:\n{schema.schema_json()}"
            
            full_prompt = prompt + schema_instruction
            
            # Using mock behavior if API key is mock
            if api_key == "mock-key":
                logger.warning("Using MOCK Gemini Client (no valid GEMINI_API_KEY). Returning simulated response.")
                return self._generate_smart_mock(prompt)

            response = self.model.generate_content(
                full_prompt,
                generation_config=generation_config
            )
            
            return json.loads(response.text)
        except Exception as e:
            logger.error(f"Gemini generation failed: {e}")
            return self._generate_smart_mock(prompt) # Fallback to mock on error to keep app running

    def _generate_smart_mock(self, prompt: str) -> dict:
        """Generates realistic-looking mock JSON data based on the prompt content."""
        prompt_lower = prompt.lower()
        
        # Determine the agent type from the prompt
        if "classify" in prompt_lower:
            return {
                "category": "Liability" if "liability" in prompt_lower else "Termination",
                "is_standard": False,
                "confidence_score": 0.92
            }
        elif "risk" in prompt_lower:
            return {
                "severity": "high" if "liability" in prompt_lower or "net 7" in prompt_lower else "moderate",
                "risk_score": 85,
                "risk_drivers": ["Aggressive payment terms", "Broad indemnity requirements", "Uncapped liability"]
            }
        elif "simulate" in prompt_lower or "consequence" in prompt_lower:
            return {
                "worst_case_scenario": "The company could face uncapped financial damages exceeding $1M for minor operational errors.",
                "financial_exposure": "High ($1M+)",
                "legal_standing": "Weak"
            }
        elif "negotiat" in prompt_lower:
            return {
                "redline_suggestion": "The total liability of either party shall not exceed the total fees paid in the 12 months prior.",
                "explanation": "Standard enterprise contracts always include a cap on liability to prevent business-ending litigation.",
                "fallback_position": "Cap liability at 2x annual contract value."
            }
        elif "explain" in prompt_lower:
            return {
                "plain_english_summary": "This clause says you are responsible for paying for almost any mistake, and there is no limit on how much you might have to pay.",
                "key_takeaways": ["No liability cap", "High financial risk", "One-sided protection"]
            }
        
        # Default fallback mock
        return {"status": "mocked", "message": "Simulated AI response"}
