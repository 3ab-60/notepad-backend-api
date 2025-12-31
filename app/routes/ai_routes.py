# ===================== AI ROUTES =====================
# Connects FastAPI backend to HuggingFace Llama 3 model using OpenAI-compatible API

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
from openai import OpenAI   # install via: pip install openai

router = APIRouter(prefix="/ai", tags=["AI Assistant"])

HF_API_KEY = os.getenv("HF_API_KEY")          # reads token from .env
MODEL = os.getenv("HF_MODEL")                 # reads your model ID from .env

# Request schema
class PromptRequest(BaseModel):
    prompt: str


# Create HF client
client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=HF_API_KEY,
)


@router.post("/chat")
def chat_with_ai(data: PromptRequest):
    """
    Receives user message -> sends to HuggingFace -> returns AI reply
    """

    try:
        # Send request to Llama3 model
        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": data.prompt}]
        )

        return {"reply": response.choices[0].message.content}

    except Exception as e:
        print("\n🔥 AI ERROR:", e, "\n")
        raise HTTPException(status_code=500, detail="AI request failed")
