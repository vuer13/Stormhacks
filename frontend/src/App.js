function App() {
  return (
    <div className="h-screen w-screen bg-white relative overflow-hidden">
      {/* Left wavy decoration */}
      <svg 
        className="absolute left-0 top-0 h-full w-40" 
        viewBox="0 0 120 1000" 
        preserveAspectRatio="none"
      >
        <path
          d="M 0,0 
             Q 70,100 50,200
             T 80,400
             T 50,600
             T 70,800
             T 60,1000
             L 0,1000 Z"
          fill="#6B7280"
        />
      </svg>

      {/* Right wavy decoration */}
      <svg 
        className="absolute right-0 top-0 h-full w-40" 
        viewBox="0 0 120 1000" 
        preserveAspectRatio="none"
      >
        <path
          d="M 120,0 
             Q 50,100 70,200
             T 40,400
             T 70,600
             T 50,800
             T 60,1000
             L 120,1000 Z"
          fill="#6B7280"
        />
      </svg>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        {/* Large text box */}
        <div className="bg-gray-200 px-16 py-12 rounded-lg mb-8 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 text-center leading-tight">
            SOME GIGANTIC PRODUCT
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mt-2">
            TYPOGRAPHY and visuals
          </h2>
        </div>

        {/* Small introductory text box */}
        <div className="bg-gray-200 px-8 py-3 rounded-lg mb-12">
          <p className="text-gray-600 text-lg">
            Some introductory text
          </p>
        </div>

        {/* Microphone button with curved text */}
        <div className="relative flex flex-col items-center mt-4">
          {/* Microphone button */}
          <button className="group">
            <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-all shadow-lg group-hover:scale-105">
              <svg 
                className="w-10 h-10 text-gray-700" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z"/>
                <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z"/>
              </svg>
            </div>
          </button>

          {/* Curved text below button */}
          <svg width="200" height="60" viewBox="0 0 200 60" className="-mt-1">
            <path
              id="textCurve"
              d="M 20,5 Q 100,60 180,5"
              fill="transparent"
            />
            <text className="text-sm fill-gray-600 font-medium">
              <textPath href="#textCurve" startOffset="50%" textAnchor="middle">
                Confide in yourself
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;