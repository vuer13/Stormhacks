import React, { useState } from "react";

function TestPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setResponse("");
    setAudioUrl(null);

    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!res.ok) throw new Error("Backend request failed");

      const data = await res.json();
      setResponse(data.gemini_response);
      setAudioUrl(`http://localhost:5000/${data.audio_path}`);
      console.log(data);
    } catch (err) {
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

      <button
        onClick={handleSend}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 disabled:bg-gray-400"
        disabled={loading || !input}
      >
        {loading ? "Processing..." : "Send to Backend"}
      </button>

      {response && (
        <div className="mt-6 bg-white shadow rounded p-4 w-full max-w-lg">
          <h2 className="font-bold mb-2">Gemini Response:</h2>
          <p className="text-gray-800">{response}</p>
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
