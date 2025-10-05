import { useState } from 'react';

export default function Chat() {
  const [isActive, setIsActive] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  // Generate random positions only once on mount
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

  return (
    <>
      {/* Animation Keyframes */}
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

        .input-wrapper {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          transition: all 1.8s cubic-bezier(0.25, 0.1, 0.25, 1);
          transform-origin: bottom;
        }

        .input-wrapper:not(.active):hover {
          transform: scale(1.2, 1.3);
        }

        .input-wrapper.active {
          transform: translateY(-80px);
        }

        .input-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 80%);
          opacity: 0;
          transition: opacity 0.3s ease-out;
          pointer-events: none;
        }

        .input-wrapper:not(.active):hover::before {
          opacity: 1;
        }
      `}</style>

      <div className="h-screen w-screen bg-black relative overflow-hidden">
      
        {/* Animated Floating Clouds */}
        <div className="absolute inset-0">
          {/* Cloud 1 */}
          <div 
            className="absolute w-[650px] h-[420px] rounded-full blur-[85px] opacity-55"
            style={{
              backgroundColor: '#474DFF',
              animation: 'float2 14s ease-in-out infinite',
              left: `${cloudPositions.cloud1.x}%`,
              top: `${cloudPositions.cloud1.y}%`
            }}
          ></div>
          
          {/* Cloud 2 */}
          <div 
            className="absolute w-[600px] h-[450px] rounded-full blur-[80px] opacity-60"
            style={{
              backgroundColor: '#474DFF',
              animation: 'float1 16s ease-in-out infinite',
              right: `${-cloudPositions.cloud2.x}%`,
              top: `${cloudPositions.cloud2.y}%`
            }}
          ></div>
          
          {/* Cloud 3 */}
          <div 
            className="absolute w-[500px] h-[400px] rounded-full blur-[75px] opacity-50"
            style={{
              backgroundColor: '#474DFF',
              animation: 'float4 15s ease-in-out infinite',
              left: `${cloudPositions.cloud3.x + 40}%`,
              top: `${cloudPositions.cloud3.y}%`
            }}
          ></div>
          
          {/* Cloud 4 */}
          <div 
            className="absolute w-[550px] h-[450px] rounded-full blur-[80px] opacity-55"
            style={{
              backgroundColor: '#474DFF',
              animation: 'float3 13s ease-in-out infinite',
              left: `${cloudPositions.cloud4.x}%`,
              bottom: `${-cloudPositions.cloud4.y}%`
            }}
          ></div>
          
          {/* Cloud 5 */}
          <div 
            className="absolute w-[580px] h-[480px] rounded-full blur-[90px] opacity-50"
            style={{
              backgroundColor: '#474DFF',
              animation: 'float5 18s ease-in-out infinite',
              right: `${-cloudPositions.cloud5.x}%`,
              bottom: `${-cloudPositions.cloud5.y}%`
            }}
          ></div>

          {/* Cloud 6 */}
          <div 
            className="absolute w-[350px] h-[280px] rounded-full blur-[65px] opacity-45"
            style={{
              backgroundColor: '#474DFF',
              animation: 'float2 16s ease-in-out infinite',
              left: `${cloudPositions.cloud6.x + 50}%`,
              top: `${cloudPositions.cloud6.y + 40}%`
            }}
          ></div>
        </div>

        {/* Chat Interface */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="p-6">
            <h1 className="text-white text-2xl font-bold">Chat with your future self</h1>
          </div>
          
          {/* Chat messages area */}
          <div className="flex-1 overflow-y-auto px-6 pb-20">
            {/* Your chat messages will go here */}
          </div>
        </div>

        {/* Audio Bar & Text Input - Bottom Center */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-20">
          {/* Audio Bar */}
          <div 
            className={`transition-all duration-[1800ms] mb-4 flex justify-center`}
            style={{
              transform: isActive ? 'translateY(-80px)' : 'translateY(0)',
              transition: 'all 1.8s cubic-bezier(0.25, 0.1, 0.25, 1)'
            }}
          >
            <div className="bg-[#7B7FFF]/20 backdrop-blur-sm rounded-full px-6 py-3 flex gap-4 items-center border border-[#9B9BFF]/30">
              {/* Microphone Button */}
              <button 
                onClick={() => setIsMicMuted(!isMicMuted)}
                className="w-12 h-12 rounded-full transition-all flex items-center justify-center group hover:scale-90 bg-[#474DFF] hover:bg-[#5B5FFF]"
              >
                {isMicMuted ? (
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 4.5l15 15" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                )}
              </button>
              
              {/* Deafen/Headphones Button */}
              <button 
                onClick={() => setIsDeafened(!isDeafened)}
                className="w-12 h-12 rounded-full transition-all flex items-center justify-center group hover:scale-90 bg-[#474DFF] hover:bg-[#5B5FFF]"
              >
                {isDeafened ? (
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 4.5l15 15" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Text Input */}
          <div className={`input-wrapper ${isActive ? 'active' : ''}`}>
            <input
              type="text"
              placeholder="Type your message..."
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
              className={`transition-all duration-[1800ms] text-white text-sm
                         border-none outline-none
                         ${isActive 
                           ? 'w-[600px] h-[120px] px-6 py-4 bg-[#2D31B0]/10 border-2 border-[#9B9BFF] placeholder-[#9B9BFF]/70' 
                           : 'w-[220px] h-16 px-5 pb-8 pt-3 bg-[#474DFF]/50 placeholder-white/70'
                         }`}
              style={{
                fontFamily: 'Cascadia Code, monospace',
                borderRadius: '16px',
                textAlign: 'left',
                textIndent: isActive ? '0px' : '15px',
                transition: 'all 1.8s cubic-bezier(0.25, 0.1, 0.25, 1)'
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}