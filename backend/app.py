from google import genai
from elevenlabs import play
from elevenlabs.client import ElevenLabs

from dotenv import load_dotenv
import os

# Load .env stuff
load_dotenv()

# Set up Gemini
gemini_api_key = os.getenv("GEMINI_API_KEY")
gemini_client = genai.Client(api_key=gemini_api_key)

# Set up ElevenLabs
elevenlabs_api_key = os.getenv("ELEVENLABS_API_KEY")
elevenlabs_client = ElevenLabs(api_key=elevenlabs_api_key)

# Function to create prompts
def create_prompt(prompt):
    full_input = f"""You are a supportive assistant. Based on the user's message below, respond in a way that reassures, provides advice, or encourages them. 
                    You are acting as the person's future self. However, you do not need to tell them that you are their future self. Return in the same language
                    that the user message gave.

                    - If the message describes something negative, offer empathy and reassurance about the future
                    - If the message describes something positive, encourage them and provide helpful advice for the future
                    
                    Keep messages relatively short. About one paragraph long is good enough. 

                    User message:
                    {prompt}"""
    
    response = gemini_client.models.generate_content(
        model="gemini-2.5-flash",
        contents=full_input
    )
    
    print(response.text)
    
    return response.text
    
if __name__ == "__main__":
    create_prompt("My team is not going to win the stanley cup")