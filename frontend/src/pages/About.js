// src/pages/About.js
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function About() {
  const navigate = useNavigate();

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
              onClick={() => navigate('/chat')}
              className="text-[#D7D8FF] hover:text-[#9B9BFF] hover:scale-90 transition-all duration-300 text-xs sm:text-sm md:text-base font-medium"
              style={{
                textShadow: '0 0 10px rgba(215, 216, 255, 0.6), 0 0 20px rgba(215, 216, 255, 0.4)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.textShadow = 'none'}
              onMouseLeave={(e) => e.currentTarget.style.textShadow = '0 0 10px rgba(215, 216, 255, 0.6), 0 0 20px rgba(215, 216, 255, 0.4)'}
            >
              Chat
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

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 py-24">
          <div className="max-w-3xl text-center">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#EDFF62] mb-8 md:mb-12"
              style={{
                fontFamily: 'Cascadia Code, monospace',
                letterSpacing: '-1px'
              }}
            >
              About Futureflect
            </h1>

            <div
              className="text-[#D7D8FF] text-base sm:text-lg md:text-xl leading-relaxed space-y-6"
              style={{
                fontFamily: 'Cascadia Code, monospace'
              }}
            >
              <p>
                Gen Z is facing unprecedented uncertainty, from rising living costs and housing insecurity to the pressure of unstable job markets. Surveys show that many young people feel increasingly anxious and hopeless about their futures. At the same time, nearly 1 in 3 people have already turned to AI for emotional or mental support, highlighting both the need and the openness to new solutions.
              </p>

              <p>
                We were inspired to create Futureflect as a bridge between these two realities. Instead of doomscrolling or bottling up worries, what if you could hear encouragement directly from your future self? Futureflect reframes challenges as part of personal growth and turns reflection into hope.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
