export default function App() {
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
        
          {/* Animated Floating Clouds in #474DFF */}
          <div className="absolute inset-0">
            {/* Cloud 1 - Left side */}
            <div 
              className="absolute w-[600px] h-96 rounded-full blur-[80px] opacity-60"
              style={{
                backgroundColor: '#474DFF',
                animation: 'float1 15s ease-in-out infinite',
                left: '-20%',
                top: '15%'
              }}
            ></div>
            
            {/* Cloud 2 - Right side */}
            <div 
              className="absolute w-[700px] h-[500px] rounded-full blur-[90px] opacity-55"
              style={{
                backgroundColor: '#474DFF',
                animation: 'float2 13s ease-in-out infinite',
                right: '-25%',
                top: '25%'
              }}
            ></div>
            
            {/* Cloud 3 - Top center */}
            <div 
              className="absolute w-[450px] h-[350px] rounded-full blur-[70px] opacity-50"
              style={{
                backgroundColor: '#474DFF',
                animation: 'float3 16s ease-in-out infinite',
                left: '35%',
                top: '-15%'
              }}
            ></div>
            
            {/* Cloud 4 - Bottom left */}
            <div 
              className="absolute w-[500px] h-[400px] rounded-full blur-[75px] opacity-55"
              style={{
                backgroundColor: '#474DFF',
                animation: 'float4 12s ease-in-out infinite',
                left: '5%',
                bottom: '-10%'
              }}
            ></div>
            
            {/* Cloud 5 - Bottom right */}
            <div 
              className="absolute w-[550px] h-[450px] rounded-full blur-[85px] opacity-50"
              style={{
                backgroundColor: '#474DFF',
                animation: 'float5 17s ease-in-out infinite',
                right: '0%',
                bottom: '5%'
              }}
            ></div>
  
            {/* Additional smaller cloud for more depth */}
            <div 
              className="absolute w-[300px] h-[250px] rounded-full blur-[60px] opacity-45"
              style={{
                backgroundColor: '#474DFF',
                animation: 'float3 14s ease-in-out infinite',
                left: '60%',
                top: '50%'
              }}
            ></div>
          </div>
  
          {/* Main content */}
          <div className="relative z-10 flex flex-col items-start pt-16 px-8">
            {/* FutureVent Logo */}
            <img 
              src="/FutureVentText.png" 
              alt="FutureVent" 
              className="w-auto h-56 md:h-64 ml-32"
            />
            
            {/* Description Text */}
            <img 
              src="/DescriptionText.png" 
              alt="Get in touch with your potential future self and share your life problems." 
              className="w-auto h-10 md:h-12 mt-6 ml-36"
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
                  fill: '#D7D8FF', 
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