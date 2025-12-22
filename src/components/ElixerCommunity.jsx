import React, { useState } from 'react';

const ElixirCommunity = () => {
  const [activeClub, setActiveClub] = useState(0); 
  const [direction, setDirection] = useState('right');

  const clubs = [
    {
      name: "Google Developers Groups On Campus ABESEC",
      shortName: "GDG",
      logo: "https://codechefabesec.netlify.app/img/faces/customers/3.jpg",
      description: "Google Developer Groups (GDG) is a community of developers interested in Google's developer technology. We host events, workshops, and study jams to help developers learn and connect with each other. Our focus areas include Android, Web, Cloud, and Machine Learning.",
      color: "border-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      name: "Geeks for Geeks Chapter ABESEC",
      shortName: "GFG",
      logo: "https://codechefabesec.netlify.app/img/faces/customers/2.jpg",
      description: "Geeks for Geeks Student Chapter is dedicated to promoting Data Structures and Algorithms knowledge among students. We conduct regular study sessions, coding challenges, and interview preparation workshops to help students excel in technical interviews and competitive programming.",
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
    <section className="py-20 px-4 bg-linear-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12 md:mb-16 px-4">
          <div className="flex justify-center items-center mb-4 md:mb-6">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-xl border-4 border-purple-500">
              <img 
                src="https://codechefabesec.netlify.app/img/faces/customers/1.jpg" 
                alt="Elixir Community" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-800 mb-3 md:mb-4 tracking-tight px-2">
            Elixir Technical Community
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-normal leading-relaxed mb-6 md:mb-8 px-4">
            A unified tech ecosystem bringing together CodeChef, GDG, and GFG chapters under one umbrella, 
            fostering innovation, collaboration, and growth at ABES Engineering College.
          </p>
        </div>

        <div className="text-center mb-8 md:mb-12 px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2 md:mb-3">
            Our Sister Chapters
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-normal">
            Explore our partner communities working together under Elixir
          </p>
        </div>

        <div className="flex justify-center items-center gap-8 md:gap-12 lg:gap-20 mb-10 md:mb-12">
          {clubs.map((club, index) => (
            <button
              key={index}
              onClick={() => handleClubClick(index)}
              className={`group cursor-pointer relative transition-all duration-300 ${
                activeClub === index ? 'scale-110' : 'scale-100'
              }`}
            >
              <div className={`w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 border-4 overflow-hidden ${
                activeClub === index ? club.color : 'border-transparent'
              } hover:shadow-xl`}>
                <img 
                  src={club.logo} 
                  alt={club.shortName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <p className={`mt-2 md:mt-3 text-sm md:text-base font-medium text-center transition-colors duration-300 ${
                activeClub === index ? 'text-gray-800 font-semibold' : 'text-gray-500'
              }`}>
                {club.shortName}
              </p>
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden w-full md:w-[85%] lg:w-[70%] m-auto bg-white rounded-3xl shadow-xl p-6 md:p-8 lg:p-12 min-h-[280px] md:min-h-[300px] flex items-center justify-center">
          <div className={`absolute inset-0 ${clubs[activeClub].bgColor} opacity-30`}></div>
          
          <div 
            key={activeClub}
            className={`relative text-center animate-slide-${direction} w-full max-w-3xl px-2`}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mb-4 md:mb-6">
              {clubs[activeClub].name}
            </h2>
            
            <div className={`w-12 md:w-16 h-1 ${clubs[activeClub].color.replace('border', 'bg')} mb-6 md:mb-8 rounded-full mx-auto`}></div>
            
            <p className="text-sm md:text-base text-gray-700 leading-relaxed font-normal">
              {clubs[activeClub].description}
            </p>
          </div>
        </div>

        <div className="text-center mt-10 md:mt-12 px-4">
          <p className="text-xs md:text-sm text-gray-600 font-normal">
            United under Elixir • Growing together • Building the future
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