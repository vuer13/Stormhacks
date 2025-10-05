# Stormhacks

Inspiration

Gen Z is facing unprecedented uncertainty, from rising living costs and housing insecurity to the pressure of unstable job markets. Surveys show that many young people feel increasingly anxious and hopeless about their futures. At the same time, nearly 1 in 3 people have already turned to AI for emotional or mental support, highlighting both the need and the openness to new solutions.

We were inspired to create Futureflect as a bridge between these two realities. Instead of doomscrolling or bottling up worries, what if you could hear encouragement directly from your future self? Futureflect reframes challenges as part of personal growth and turns reflection into hope.
What it does

Futureflect lets users record or type a message about how they’re feeling. Here’s what happens next:

    Sentiment Analysis: Using a PyTorch model, the system first analyzes the emotional tone of the input (e.g., sadness, anxiety, excitement).
    Context-Aware Generation: Those sentiments are passed directly into Google Gemini with a structured prompt
    Empathetic Voice Output: Gemini generates an encouraging message, which is then spoken aloud in a warm, natural-sounding voice using ElevenLabs.

The result is an experience that feels personalized, reflective, and emotionally aware. It's than just a chatbot, it’s like a supportive check-in with your future self.
How we built it

    Frontend: React with microphone input, live transcription, and interactive UI. Styled with Tailwind.
    Backend: Flask API handling audio uploads, transcription, sentiment analysis, Gemini integration, and TTS synthesis.

    AI Pipeline:
        PyTorch model for sentiment detection.
        Gemini for empathetic, future-focused text responses.
        ElevenLabs for realistic text-to-speech audio.

Challenges we ran into

    Training and integrating a PyTorch sentiment model into the pipeline.
    Making the frontend microphone recording and backend processing feel seamless despite latency.

Accomplishments that we're proud of

    Building a full voice → sentiment → AI → voice pipeline.
    Successfully guiding Gemini’s outputs with live sentiment data.
    Creating an experience that feels emotionally attuned, not just “AI-generated.”

What we learned

    How to combine PyTorch with a production-ready Flask pipeline.
    New techniques for audio conversion, preprocessing, and API orchestration.
    The delicate balance of designing tech for sensitive, emotional use cases.

What's next for Futureflect

    More advanced sentiment detection (multi-label, nuanced emotions).
    Personalized response styles tailored over time.
    A journaling/history feature so users can reflect on their progress.

