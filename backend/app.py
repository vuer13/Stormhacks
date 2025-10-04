import os
import time
import subprocess
from dotenv import load_dotenv
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import speech_recognition as sr
from google import genai
from elevenlabs.client import ElevenLabs


load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")


gemini_client = genai.Client(api_key=GEMINI_API_KEY)
elevenlabs_client = ElevenLabs(api_key=ELEVENLABS_API_KEY)


app = Flask(__name__)
CORS(app)


def convert_to_pcm_wav(file_path):
    """
    Convert audio to mono 16kHz 16-bit PCM WAV using ffmpeg.
    """
    base_dir = os.path.dirname(file_path)
    filename_base = os.path.basename(file_path).rsplit(".", 1)[0]
    pcm_path = os.path.join(base_dir, f"{filename_base}_pcm.wav")

    import imageio_ffmpeg as ffmpeg
    ffmpeg_exe = os.path.abspath(ffmpeg.get_ffmpeg_exe())

    cmd = [
        ffmpeg_exe,
        "-y",               # overwrite output
        "-i", file_path,    # input file
        "-ac", "1",         # mono
        "-ar", "16000",     # 16kHz
        "-sample_fmt", "s16", # 16-bit PCM
        pcm_path
    ]
    subprocess.run(cmd, check=True)
    return pcm_path

def extract_text(audio_path):
    """
    Extract text from WAV audio using Google Speech Recognition.
    """
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        audio_data = recognizer.record(source)
        text = recognizer.recognize_google(audio_data)
        print(f"Extracted Text: {text}")
    return text

def create_prompt(prompt):
    full_input = f"""You are a supportive assistant. Based on the user's message below, respond in a way that reassures, provides advice, or encourages them. 
                    You are acting as the person's future self. Return in the same language
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

def eleven_labs_tts(prompt, voice_id):
    """
    Convert text to speech with ElevenLabs.
    """
    kwargs = {
        "voice_id": voice_id,
        "model_id": "eleven_multilingual_v2",
        "text": prompt
    }

    audio = elevenlabs_client.text_to_speech.convert(**kwargs)

    filename = f"output_{int(time.time())}.mp3"
    output_dir = "output"
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, filename)

    with open(output_path, "wb") as f:
        for chunk in audio:
            f.write(chunk)

    return f"http://localhost:5000/output/{filename}"



@app.route('/generate', methods=["POST"])
def generate():
    if "file" in request.files:
        file = request.files["file"]
        filepath = os.path.join("uploads", file.filename)
        os.makedirs("uploads", exist_ok=True)
        file.save(filepath)

        # Convert to WAV and extract text
        wav_path = convert_to_pcm_wav(filepath)
        text = extract_text(wav_path)
    elif request.is_json:
        data = request.get_json()
        text = data.get("text")
    else:
        return jsonify({"error": "Invalid input"}), 400

    # Generate response
    voice_id = "0lp4RIz96WD1RUtvEu3Q"  # default voice
    response_text = create_prompt(text)
    speech_url = eleven_labs_tts(response_text, voice_id)

    return jsonify({
        "gemini_response": response_text,
        "audio_path": speech_url
    }), 200

@app.route('/output/<path:filename>')
def serve_output(filename):
    return send_from_directory("output", filename)


if __name__ == "__main__":
    app.run(debug=True)
