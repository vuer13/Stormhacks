from google import genai
from elevenlabs import play
from elevenlabs.client import ElevenLabs

import speech_recognition as sr

from flask import Flask, request, jsonify, send_file

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

# Flask
app = Flask(__name__)

@app.route('/generate', methods=["POST"])
def generate():
    if "file" in request.files:
        file = request.files["file"]
        filepath = os.path.join("uploads", file.filename)
        os.makedirs("uploads", exist_ok=True)
        file.save(filepath)
        
        text = extract_text(filepath)
        
        voice = elevenlabs_client.voices.add(
            name="VoiceClone",
            files=[filepath]
        )
        
        voice_id = voice.voice_id
        use_settings = True
    elif request.is_json:
        data = request.get_json()
        text = data.get("text")
        
        voice_id = "0lp4RIz96WD1RUtvEu3Q" # Old grandfather voice
        use_settings = False
    else:
        return jsonify({"error": "Invalid input"}), 400
    
    
    response = create_prompt(text) # Gemini text
    speech = eleven_labs(response, voice_id, use_settings) # Send some old grandpa voice is default
        
    return jsonify({
        "gemini_response": response,
        "audio_path": speech
    }), 200

# Function to create prompts
def create_prompt(prompt):
    full_input = f"""You are a supportive assistant. Based on the user's message below, respond in a way that reassures, provides advice, or encourages them. Return in the same language
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

# Function to turn text into speech
def eleven_labs(prompt, voice_id, settings):    
    kwargs = {
        "voice_id": voice_id,
        "model_id": "eleven_multilingual_v2",
        "text": prompt
    }
    
    if settings:
        kwargs["voice_settings"] = {
            "stability": 0.3,
            "similarity_boost": 0.7,
            "style": 0.6,
            "use_effects_mixer": True
        }
    
    audio = elevenlabs_client.text_to_speech.convert(**kwargs)
    
    output_path = "output/output.mp3"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, "wb") as f:
        for chunk in audio:
            f.write(chunk)
            
    return output_path
        
# Get text from audio    
def extract_text(audio_path):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        audio_data = recognizer.record(source)
        text = recognizer.recognize_google(audio_data)
    return text
    
if __name__ == "__main__":
    app.run(debug=True)