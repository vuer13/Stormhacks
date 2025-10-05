import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
  const [messages, setMessages] = useState([]); // Store all messages
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      // Only load last 3 messages
      const parsed = JSON.parse(savedMessages);
      setMessages(parsed.slice(-3));
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Clear chat history
  const clearChatHistory = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
    setAudioUrl(null);
  };

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
    setAudioUrl(null);

    // Add user message (audio recording indicator)
    const userMessage = { sender: "user", text: "[Voice message]", timestamp: Date.now() };
    setMessages(prev => {
      const updated = [...prev, userMessage];
      // Keep only last 3 messages
      return updated.slice(-3);
    });

    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Backend request failed");
      const data = await res.json();

      // Add AI response
      const aiMessage = { sender: "ai", text: data.gemini_response, timestamp: Date.now() };
      setMessages(prev => {
        const updated = [...prev, aiMessage];
        // Keep only last 3 messages
        return updated.slice(-3);
      });
      setAudioUrl(data.audio_path);
    } catch (err) {
      console.error(err);
      const errorMessage = { sender: "ai", text: "Error: Could not reach backend.", timestamp: Date.now() };
      setMessages(prev => {
        const updated = [...prev, errorMessage];
        // Keep only last 3 messages
        return updated.slice(-3);
      });
    } finally {
      setLoading(false);
    }
  };

  // Send text input
  const handleSendText = async () => {
    if (!input.trim()) return; // no empty messages

    const userText = input;
    setInput(""); // clear text box immediately
    setLoading(true);
    setAudioUrl(null);

    // Add user message
    const userMessage = { sender: "user", text: userText, timestamp: Date.now() };
    setMessages(prev => {
      const updated = [...prev, userMessage];
      // Keep only last 3 messages
      return updated.slice(-3);
    });

    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userText }),
      });

      if (!res.ok) throw new Error("Backend request failed");
      const data = await res.json();

      // Add AI response
      const aiMessage = { sender: "ai", text: data.gemini_response, timestamp: Date.now() };
      setMessages(prev => {
        const updated = [...prev, aiMessage];
        // Keep only last 3 messages
        return updated.slice(-3);
      });
      setAudioUrl(data.audio_path);
    } catch (err) {
      console.error(err);
      const errorMessage = { sender: "ai", text: "Error: Could not reach backend.", timestamp: Date.now() };
      setMessages(prev => {
        const updated = [...prev, errorMessage];
        // Keep only last 3 messages
        return updated.slice(-3);
      });
    } finally {
      setLoading(false);
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

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="h-screen w-screen bg-black relative overflow-hidden">
        {/* Navigation Bar */}
        <nav className="absolute top-6 left-1/2 -translate-x-1/2 z-30 bg-[#474DFF]/30 backdrop-blur-sm rounded-2xl px-8 sm:px-12 md:px-16 lg:px-24 py-2 sm:py-3 md:py-4 w-[calc(100%-4rem)] sm:w-[calc(100%-6rem)] md:w-[calc(100%-8rem)] lg:w-[calc(100%-12rem)] max-w-[1200px]">
          <div className="flex items-center justify-around">
            <button
              onClick={() => navigate('/')}
              className="text-[#D7D8FF] hover:text-[#9B9BFF] hover:scale-90 transition-all duration-300 text-xs sm:text-sm md:text-base font-medium"
              style={{
                textShadow: '0 0 10px rgba(215, 216, 255, 0.6), 0 0 20px rgba(215, 216, 255, 0.4)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.textShadow = 'none'}
              onMouseLeave={(e) => e.currentTarget.style.textShadow = '0 0 10px rgba(215, 216, 255, 0.6), 0 0 20px rgba(215, 216, 255, 0.4)'}
            >
              Home
            </button>
            <button
              onClick={() => navigate('/about')}
              className="text-[#D7D8FF] hover:text-[#9B9BFF] hover:scale-90 transition-all duration-300 text-xs sm:text-sm md:text-base font-medium"
              style={{
                textShadow: '0 0 10px rgba(215, 216, 255, 0.6), 0 0 20px rgba(215, 216, 255, 0.4)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.textShadow = 'none'}
              onMouseLeave={(e) => e.currentTarget.style.textShadow = '0 0 10px rgba(215, 216, 255, 0.6), 0 0 20px rgba(215, 216, 255, 0.4)'}
            >
              About
            </button>
            <button
              className="text-[#D7D8FF] hover:text-[#9B9BFF] hover:scale-90 transition-all duration-300 text-xs sm:text-sm md:text-base font-medium"
              style={{
                textShadow: '0 0 10px rgba(215, 216, 255, 0.6), 0 0 20px rgba(215, 216, 255, 0.4)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.textShadow = 'none'}
              onMouseLeave={(e) => e.currentTarget.style.textShadow = '0 0 10px rgba(215, 216, 255, 0.6), 0 0 20px rgba(215, 216, 255, 0.4)'}
            >
              Settings
            </button>
          </div>
        </nav>

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

        {/* Center Images */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          {/* Spinning Flower behind */}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center" style={{ animation: 'spin 10s linear infinite' }}>
            <img src="/Flower.svg" alt="Flower" className="w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] opacity-60" />
          </div>
          {/* Center Image on top */}
          <img src="/CenterImage.svg" alt="Center" className="relative z-10 w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] opacity-70" />
        </div>

        {/* Chat Area */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex-1 px-4 md:px-8 pb-20 pt-8 flex items-center justify-center">
            <div className="w-full max-w-[95%]">
              <div className="flex flex-col space-y-6">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl px-6 py-4 max-w-sm">
                      <p
                        className={`text-sm mb-1 font-semibold ${msg.sender === 'user' ? 'text-white/90' : 'text-[#EDFF62]'}`}
                        style={{ fontFamily: 'Cascadia Code, monospace' }}
                      >
                        {msg.sender === 'user' ? 'You' : 'Future You'}
                      </p>
                      <p className="text-white/70" style={{ fontFamily: 'Cascadia Code, monospace' }}>{msg.text}</p>
                    </div>
                  </div>
                ))}

                {audioUrl && (
                  <div className="flex justify-center">
                    <audio src={audioUrl} autoPlay style={{ display: "none" }} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Loading - Always centered */}
          {loading && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl px-6 py-4">
                <p className="text-white/70" style={{ fontFamily: 'Cascadia Code, monospace' }}>Loading...</p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom controls */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20">
          {/* Audio buttons */}
          <div
            className={`transition-all flex justify-center`}
            style={{
              transform: isActive ? "translateY(-100px)" : isHovered ? "translateY(-15px)" : "translateY(0)",
              marginBottom: "16px",
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
                className="w-12 h-12 rounded-full flex items-center justify-center bg-[#474DFF] hover:bg-[#5B5FFF] hover:scale-90 hover:shadow-[0_0_15px_rgba(91,95,255,0.6)] transition-all duration-300"
              >
                {recording ? (
                  <img src="/MicActive.svg" alt="Recording" className="w-6 h-6" />
                ) : (
                  <img src="/MicDeactive.svg" alt="Mic Muted" className="w-6 h-6" />
                )}
              </button>

              {/* Deafen button */}
              <button
                onClick={() => setIsDeafened(!isDeafened)}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-[#474DFF] hover:bg-[#5B5FFF] hover:scale-90 hover:shadow-[0_0_15px_rgba(91,95,255,0.6)] transition-all duration-300"
              >
                {isDeafened ? (
                  <img src="/DeafenOn.svg" alt="Deafened" className="w-6 h-6" />
                ) : (
                  <img src="/DeafenOff.svg" alt="Not Deafened" className="w-6 h-6" />
                )}
              </button>

              {/* Clear Chat button */}
              {messages.length > 0 && (
                <button
                  onClick={clearChatHistory}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-[#474DFF] hover:bg-[#5B5FFF] hover:scale-90 hover:shadow-[0_0_15px_rgba(91,95,255,0.6)] transition-all duration-300"
                  title="Clear Chat"
                >
                  <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
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
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendText()}
              className={`text-white text-sm outline-none
                         ${
                           isActive
                             ? "w-[600px] h-[120px] px-6 py-4 bg-[#2D31B0]/10 border-2 border-[#9B9BFF]/50 placeholder-[#9B9BFF]/70 translate-y-[-100px] mix-blend-color-burn"
                             : isHovered
                             ? "w-[242px] h-[90px] px-5 pb-8 pt-3 bg-[#5B5FFF]/40 border-2 border-white/30 placeholder-white/90 shadow-[inset_0_-20px_40px_rgba(255,255,255,0.3)] translate-y-[-15px]"
                             : "w-[220px] h-16 px-5 pb-8 pt-3 bg-[#474DFF]/30 border-2 border-white/20 placeholder-white/70"
                         }`}
              style={{
                fontFamily: "Cascadia Code, monospace",
                borderRadius: "16px",
                transition: isActive
                  ? "all 1.8s cubic-bezier(0.25, 0.1, 0.25, 1)"
                  : isHovered
                  ? "all 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)"
                  : "all 1.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
