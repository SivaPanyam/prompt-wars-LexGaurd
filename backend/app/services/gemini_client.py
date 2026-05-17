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
                logger.warning("Using MOCK Gemini Client (no valid GEMINI_API_KEY). Returning empty structure.")
                return {}

            response = self.model.generate_content(
                full_prompt,
                generation_config=generation_config
            )
            
            return json.loads(response.text)
        except Exception as e:
            logger.error(f"Gemini generation failed: {e}")
            raise RuntimeError(f"AI Generation Failed: {e}")
