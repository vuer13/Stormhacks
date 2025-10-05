// src/pages/Home.js
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  
  // Generate random positions for clouds on each page load
  const getRandomPosition = () => ({
    x: Math.random() * 100 - 50, // -50% to 50%
    y: Math.random() * 100 - 50, // -50% to 50%
  });

  const cloud1 = getRandomPosition();
  const cloud2 = getRandomPosition();
  const cloud3 = getRandomPosition();
  const cloud4 = getRandomPosition();
  const cloud5 = getRandomPosition();
  const cloud6 = getRandomPosition();

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

        @keyframes pulseGlow {
          0%, 100% { 
            filter: drop-shadow(0 0 12px rgba(255,255,255,0.4));
          }
          50% { 
            filter: drop-shadow(0 0 20px rgba(255,255,255,0.6));
          }
        }

        @keyframes spinText {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>

      <div className="h-screen w-screen bg-black relative overflow-hidden">
      
        {/* Animated Floating Clouds - Random starting positions */}
        <div className="absolute inset-0">
          {/* Cloud 1 */}
          <div 
            className="absolute w-[600px] h-96 rounded-full blur-[80px] opacity-60"
            style={{
              backgroundColor: '#474DFF',
              animation: 'float1 15s ease-in-out infinite',
              left: `${cloud1.x}%`,
              top: `${cloud1.y}%`
            }}
          ></div>
          
          {/* Cloud 2 */}
          <div 
            className="absolute w-[700px] h-[500px] rounded-full blur-[90px] opacity-55"
            style={{
              backgroundColor: '#474DFF',
              animation: 'float2 13s ease-in-out infinite',
              right: `${-cloud2.x}%`,
              top: `${cloud2.y}%`
            }}
          ></div>
          
          {/* Cloud 3 */}
          <div 
            className="absolute w-[450px] h-[350px] rounded-full blur-[70px] opacity-50"
            style={{
              backgroundColor: '#474DFF',
              animation: 'float3 16s ease-in-out infinite',
              left: `${cloud3.x + 35}%`,
              top: `${cloud3.y}%`
            }}
          ></div>
          
          {/* Cloud 4 */}
          <div 
            className="absolute w-[500px] h-[400px] rounded-full blur-[75px] opacity-55"
            style={{
              backgroundColor: '#474DFF',
              animation: 'float4 12s ease-in-out infinite',
              left: `${cloud4.x}%`,
              bottom: `${-cloud4.y}%`
            }}
          ></div>
          
          {/* Cloud 5 */}
          <div 
            className="absolute w-[550px] h-[450px] rounded-full blur-[85px] opacity-50"
            style={{
              backgroundColor: '#474DFF',
              animation: 'float5 17s ease-in-out infinite',
              right: `${-cloud5.x}%`,
              bottom: `${-cloud5.y}%`
            }}
          ></div>

          {/* Cloud 6 */}
          <div 
            className="absolute w-[300px] h-[250px] rounded-full blur-[60px] opacity-45"
            style={{
              backgroundColor: '#474DFF',
              animation: 'float3 14s ease-in-out infinite',
              left: `${cloud6.x + 60}%`,
              top: `${cloud6.y + 50}%`
            }}
          ></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center pt-4 px-8">
          {/* FutureVent Logo */}
          <img
            src="/typography.png"
            alt="FutureVent"
            className="w-auto h-[28rem] md:h-[32rem]"
          />

          {/* Description Text */}
          <img
            src="/HomeDescriptionText.svg"
            alt="Get in touch with your potential future self and share your life problems."
            className="w-auto h-8 md:h-10 mt-6"
          />
        </div>

        {/* Microphone Button - Centered Bottom Half */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10">
          <div className="relative inline-block">
            {/* Circular Text - Spins continuously, pauses on hover */}
            <svg 
              id="circularText"
              className="absolute top-1/2 left-1/2 pointer-events-none"
              width="200"
              height="200"
              viewBox="0 0 200 200"
              style={{ 
                animation: 'spinText 8s linear infinite'
              }}
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                />
              </defs>
              <text style={{
                fontFamily: 'Cascadia Code, monospace',
                fill: '#EDFF62',
                fontSize: '14px',
                fontWeight: '800',
                letterSpacing: '-0.5px'
              }}>
                <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                  Confide in yourself
                </textPath>
              </text>
            </svg>
            
            {/* Microphone Button */}
            <button 
            
              className="relative transition-transform duration-300 hover:scale-105"
              style={{
                animation: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.animation = 'pulseGlow 3.5s ease-in-out infinite';
                const textEl = document.getElementById('circularText');
                
                // Pause animation and lock position
                textEl.style.animationPlayState = 'paused';
              }}
              onClick={() => navigate('/chat')}
              onMouseLeave={(e) => {
                e.currentTarget.style.animation = 'none';
                const textEl = document.getElementById('circularText');
                
                // Resume animation from current position
                textEl.style.animationPlayState = 'running';
              }}
            >
              <img 
                src="/MIC.png" 
                alt="Confide in yourself" 
                className="w-auto h-36 md:h-40"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}