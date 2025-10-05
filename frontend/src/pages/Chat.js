import React, { useState, useRef } from "react";

export default function Chat() {
  const [isActive, setIsActive] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  // Random cloud positions
  const [cloudPositions] = useState(() => {
    const getRandomPosition = () => ({
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
    });

    return {
      cloud1: getRandomPosition(),
      cloud2: getRandomPosition(),
      cloud3: getRandomPosition(),
      cloud4: getRandomPosition(),
      cloud5: getRandomPosition(),
      cloud6: getRandomPosition(),
    };
  });

  // ----------------- BEGINNING OF BACKEND HOOKS -----------------
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
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
    setAudioUrl(null);

    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Backend request failed");
      const data = await res.json();

      setResponse(data.gemini_response);
      setAudioUrl(data.audio_path);
    } catch (err) {
      console.error(err);
      setResponse("Error: Could not reach backend.");
    } finally {
      setLoading(false);
    }
  };

  // Send text input
  const handleSendText = async () => {
    if (!input.trim()) return; // no empty messages
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
      setAudioUrl(data.audio_path);
    } catch (err) {
      console.error(err);
      setResponse("Error: Could not reach backend.");
    } finally {
      setLoading(false);
      setInput(""); // clear text box
    }
  };
  // ----------------- END OF BACKEND HOOKS -----------------

  return (
    <>
      {/* Floating cloud animations */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(120px, -100px) scale(1.2); }
          50% { transform: translate(-80px, -150px) scale(0.85); }
          75% { transform: translate(140px, -80px) scale(1.1); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-150px, 120px) scale(1.25); }
          66% { transform: translate(-200px, -90px) scale(0.9); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(-130px, 110px) scale(1.15); }
          60% { transform: translate(150px, 180px) scale(0.95); }
        }
        @keyframes float4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(180px, -110px) scale(1.3); }
          80% { transform: translate(-100px, -140px) scale(0.8); }
        }
        @keyframes float5 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          20% { transform: translate(-120px, -130px) scale(1.2); }
          50% { transform: translate(130px, -80px) scale(0.9); }
          80% { transform: translate(-150px, 100px) scale(1.1); }
        }
      `}</style>

      <div className="h-screen w-screen bg-black relative overflow-hidden">
        {/* Clouds */}
        <div className="absolute inset-0">
          {Object.entries(cloudPositions).map(([key, pos], idx) => (
            <div
              key={key}
              className="absolute rounded-full blur-[80px] opacity-55"
              style={{
                width: 500 + idx * 30 + "px",
                height: 400 + idx * 20 + "px",
                backgroundColor: "#474DFF",
                animation: `float${(idx % 5) + 1} ${13 + idx}s ease-in-out infinite`,
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
            ></div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="p-6">
            <h1 className="text-white text-2xl font-bold">
              Chat with your future self
            </h1>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-20 text-white">
            {loading && <p>Loading...</p>}
            {response && <p className="mb-2">Future You: {response}</p>}
            {audioUrl && (
              <audio controls src={audioUrl} className="mt-2" autoPlay />
            )}
          </div>
        </div>

        {/* Bottom controls */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-20">
          {/* Audio buttons */}
          <div
            className={`transition-all duration-[1800ms] mb-4 flex justify-center`}
            style={{
              transform: isActive ? "translateY(-80px)" : "translateY(0)",
              transition: "all 1.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          >
            <div className="bg-[#7B7FFF]/20 backdrop-blur-sm rounded-full px-6 py-3 flex gap-4 items-center border border-[#9B9BFF]/30">
              {/* Mic button = start/stop recording */}
              <button
                onClick={() => {
                  if (recording) {
                    stopRecording();
                  } else {
                    startRecording();
                  }
                  setIsMicMuted(!isMicMuted);
                }}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-[#474DFF] hover:bg-[#5B5FFF] transition-all"
              >
                {recording ? (
                  <span className="text-white">⏹</span>
                ) : (
                  <span className="text-white">🎙</span>
                )}
              </button>

              {/* Deafen button */}
              <button
                onClick={() => setIsDeafened(!isDeafened)}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-[#474DFF] hover:bg-[#5B5FFF] transition-all"
              >
                {isDeafened ? "🙉" : "🎧"}
              </button>
            </div>
          </div>

          {/* Text input */}
          <div className={`input-wrapper ${isActive ? "active" : ""}`}>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendText()}
              className={`transition-all duration-[1800ms] text-white text-sm
                         border-none outline-none
                         ${
                           isActive
                             ? "w-[600px] h-[120px] px-6 py-4 bg-[#2D31B0]/10 border-2 border-[#9B9BFF] placeholder-[#9B9BFF]/70"
                             : "w-[220px] h-16 px-5 pb-8 pt-3 bg-[#474DFF]/50 placeholder-white/70"
                         }`}
              style={{
                fontFamily: "Cascadia Code, monospace",
                borderRadius: "16px",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
