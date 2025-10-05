import React, { useState, useRef } from "react";

function TestPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [sentiment, setSentiment] = useState("");
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Start recording
  const startRecording = async () => {
    setRecording(true);
    audioChunksRef.current = [];

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = handleStopRecording;
    mediaRecorderRef.current.start();
  };

  // Stop recording
  const stopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current.stop();
  };

  // Send recorded audio to backend
  const handleStopRecording = async () => {
    const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
    const formData = new FormData();
    formData.append("file", blob, "recording.wav");

    setLoading(true);
    setResponse("");
    setSentiment(null);
    setAudioUrl(null);

    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Backend request failed");
      const data = await res.json();
    
      setResponse(data.gemini_response);
      setSentiment(data.sentiment);
      setAudioUrl(data.audio_path);
    } catch (err) {
      console.error(err);
      setResponse("Error: Could not reach backend.");
    } finally {
      setLoading(false);
    }
  };

  // Send text input (existing functionality)
  const handleSendText = async () => {
    setLoading(true);
    setResponse("");
    setSentiment(null)
    setAudioUrl(null);

    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!res.ok) throw new Error("Backend request failed");
      const data = await res.json();
      console.log(data.sentiment)
      setResponse(data.gemini_response);
      setSentiment(data.sentiment);
      setAudioUrl(data.audio_path);     } catch (err) {
      console.error(err);
      setResponse("Error: Could not reach backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Backend Test Page</h1>

      <textarea
        className="border border-gray-400 rounded p-3 w-full max-w-lg mb-4"
        rows="4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message to send to the backend..."
      />

      <div className="flex gap-4 mb-4">
        <button
          onClick={handleSendText}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading || !input}
        >
          {loading ? "Processing..." : "Send Text"}
        </button>

        {recording ? (
          <button
            onClick={stopRecording}
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
          >
            Stop Recording
          </button>
        ) : (
          <button
            onClick={startRecording}
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
          >
            Record
          </button>
        )}
      </div>

      {response && (
        <div className="mt-6 bg-white shadow rounded p-4 w-full max-w-lg">
          <h2 className="font-bold mb-2">Gemini Response:</h2>
          <p className="text-gray-800">{response + '\n' + JSON.stringify(sentiment, null, 2)}</p>
        </div>
      )}

      {audioUrl && (
        <div className="mt-6">
          <audio controls src={audioUrl} />
        </div>
      )}
    </div>
  );
}

export default TestPage;
