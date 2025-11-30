import React, { useState } from 'react';

const ElixirCommunity = () => {
  const [activeClub, setActiveClub] = useState(1); 
  const [direction, setDirection] = useState('right');

  const clubs = [
    {
      name: "Google Developers Groups",
      shortName: "GDG",
      logo: "https://codechefabesec.netlify.app/img/faces/customers/3.jpg",
      description: "Google Developer Groups (GDG) is a community of developers interested in Google's developer technology. We host events, workshops, and study jams to help developers learn and connect with each other. Our focus areas include Android, Web, Cloud, and Machine Learning.",
      color: "border-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      name: "CodeChef",
      shortName: "CodeChef",
      logo: "/logo.png",
      description: "CodeChef Chapter focuses on competitive programming and algorithmic problem-solving. We organize regular coding contests, practice sessions, and workshops to help students improve their programming skills and prepare for technical interviews at top companies.",
      color: "border-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      name: "GeeksforGeeks",
      shortName: "GFG",
      logo: "https://codechefabesec.netlify.app/img/faces/customers/2.jpg",
      description: "GeeksforGeeks Student Chapter is dedicated to promoting Data Structures and Algorithms knowledge among students. We conduct regular study sessions, coding challenges, and interview preparation workshops to help students excel in technical interviews and competitive programming.",
      color: "border-green-600",
      bgColor: "bg-green-50"
    }
  ];

  const handleClubClick = (index) => {
    if (index < activeClub) {
      setDirection('left');
    } else if (index > activeClub) {
      setDirection('right');
    }
    setActiveClub(index);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
              <img 
                src="https://codechefabesec.netlify.app/img/faces/customers/1.jpg" 
                alt="Elixir Community" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-light text-gray-800 mb-4 tracking-tight">
            Elixir Community
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            A vibrant tech ecosystem fostering innovation and collaboration through three sister chapters, 
            united in our mission to empower students and developers.
          </p>
        </div>

        <div className="text-center mb-12">
          <span className="text-sm font-light text-gray-500 uppercase tracking-widest">
            Sister Chapters
          </span>
        </div>

       
        <div className="flex justify-center items-center gap-8 md:gap-16 mb-12">
          {clubs.map((club, index) => (
            <button
              key={index}
              onClick={() => handleClubClick(index)}
              className={`group cursor-pointer relative transition-all duration-300 ${
                activeClub === index ? 'scale-110' : 'scale-100'
              }`}
            >
              <div className={`w-20 h-20 md:w-28 md:h-28 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 border-4 overflow-hidden ${
                activeClub === index ? club.color : 'border-transparent'
              } hover:shadow-xl`}>
                <img 
                  src={club.logo} 
                  alt={club.shortName}
                  className="w-full h-full object-cover"
                />
              </div>
              
             
              <p className={`mt-3 text-sm font-light text-center transition-colors duration-300 ${
                activeClub === index ? 'text-gray-800 font-normal' : 'text-gray-500'
              }`}>
                {club.shortName}
              </p>
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden bg-white rounded-3xl shadow-xl p-8 md:p-12 min-h-[280px] flex items-center justify-center">
          <div className={`absolute inset-0 ${clubs[activeClub].bgColor} opacity-30`}></div>
          
          <div 
            key={activeClub}
            className={`relative text-center animate-slide-${direction} max-w-3xl`}
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-6">
              {clubs[activeClub].name}
            </h2>
            
            <div className={`w-16 h-1 ${clubs[activeClub].color.replace('border', 'bg')} mb-8 rounded-full mx-auto`}></div>
            
            <p className="text-lg text-gray-700 leading-relaxed font-light">
              {clubs[activeClub].description}
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-400 font-light italic">
            Together we learn, grow, and innovate
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-left {
          animation: slide-left 0.5s ease-out;
        }

        .animate-slide-right {
          animation: slide-right 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default ElixirCommunity;