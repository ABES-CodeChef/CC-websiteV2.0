import React, { useState, useEffect } from 'react';

// 1. Move static data OUTSIDE the component.
// Defined in reverse order (highest threshold first) to make the logic faster/simpler.
const messages = [
  { threshold: 98, text: "BUILD SUCCESSFUL. Ready to deploy." },
  { threshold: 88, text: "Rendering visual assets..." },
  { threshold: 75, text: "Parsing user_feedback.log..." },
  { threshold: 55, text: "Fetching legacy_pointers (Ex-Heads)..." },
  { threshold: 35, text: "Compiling active_initiatives..." },
  { threshold: 15, text: "Importing <Bawarchikhaana /> libraries..." },
  { threshold: 0,  text: "Initializing CodeChef_ABESEC.exe..." },
];

const CompilationBar = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [statusMessage, setStatusMessage] = useState(messages[messages.length - 1].text);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      // 2. Use 'ticking' to prevent calculations if the browser is busy
      if (!ticking) {
        window.requestAnimationFrame(() => {
          
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          // Calculate percent
          const percent = Math.min((currentScroll / totalHeight) * 100, 100);
          
          setScrollPercent(percent);

          // 3. Optimized search: Find the first message where percent > threshold
          // Since array is reversed, this finds the highest applicable threshold immediately
          const currentMsg = messages.find(msg => percent >= msg.threshold);
          if (currentMsg) {
            setStatusMessage(currentMsg.text);
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full h-8 bg-gray-900 border-t border-gray-700 flex items-center px-4 font-mono text-xs z-50 shadow-lg">
      
      {/* 1. Terminal Prompt */}
      <div className="flex-grow flex items-center text-teal-400 z-10 overflow-hidden whitespace-nowrap">
        <span className="mr-2 text-pink-500">➜</span>
        <span className="text-gray-400 hidden sm:inline">~/codechef-abesec/site</span>
        <span className="mx-2 text-gray-600 hidden sm:inline">|</span>
        {/* Added a min-width to prevent jitter when text length changes */}
        <span className="text-green-400 min-w-[200px] transition-opacity duration-300">
            {statusMessage}
        </span>
      </div>

      {/* 2. Percentage */}
      <div className="text-teal-300 font-bold z-10">
        [ {Math.round(scrollPercent)}% ]
      </div>

      {/* 3. Progress Bar Overlay */}
      <div 
        className="absolute top-0 left-0 h-full bg-teal-500/20 pointer-events-none"
        // 4. CSS Transition: eased for smoothness, applied to 'width'
        style={{ 
            width: `${scrollPercent}%`,
            transition: 'width 0.2s ease-out' 
        }}
      ></div>
      
      {/* Optional: A thin bright line at the very top of the bar for extra "tech" feel */}
      <div 
        className="absolute top-0 left-0 h-[1px] bg-teal-400 shadow-[0_0_10px_#2dd4bf]"
        style={{ 
            width: `${scrollPercent}%`,
            transition: 'width 0.2s ease-out' 
        }}
      ></div>
    </div>
  );
};

export default CompilationBar;