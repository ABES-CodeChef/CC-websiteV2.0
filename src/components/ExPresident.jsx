import React, { useState, useEffect, useRef } from 'react';
import { Linkedin } from 'lucide-react';

const ExPresident = () => {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);
  const [row1Scale, setRow1Scale] = useState(1);
  const [row2Scale, setRow2Scale] = useState(1);
  const [row3Scale, setRow3Scale] = useState(1);

  useEffect(() => {
    const calculateScale = (element) => {
      if (!element) return 1;
      
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementMiddle = rect.top + rect.height / 2;
      const viewportMiddle = windowHeight / 2;
      
      // Calculate distance from viewport center
      const distance = Math.abs(elementMiddle - viewportMiddle);
      const maxDistance = windowHeight;
      
      // Scale from 0.7 to 1 based on distance
      const scale = Math.max(0.7, 1 - (distance / maxDistance) * 0.3);
      return scale;
    };

    const handleScroll = () => {
      setRow1Scale(calculateScale(row1Ref.current));
      setRow2Scale(calculateScale(row2Ref.current));
      setRow3Scale(calculateScale(row3Ref.current));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const presidents = [
    {
      id: 1,
      name: "Tanishq Srivastava",
      skill: "Full Stack Flutter Developer",
      role: "President 2020-2021",
      image: "/tanishq-bhaiya.webp",
      profileImg: "/tanishq-bhaiya.webp",
      username: "@tanishq ",
      linkedin: "https://www.linkedin.com/in/tannatsri/"
    },
    {
      id: 2,
      name: "Bhumika Arora",
      skill: "Analyst, KPMG",
      role: "President 2022-2023",
      image: "/bhumika-didi.webp",
      profileImg: "/bhumika-didi.webp",
      username: "@bhumika",
      linkedin: "https://www.linkedin.com/in/thebhumikaarora/"
    },
    {
      id: 3,
      name: "Sai Aryan Goswami",
      skill: "Full Stack Developer",
      role: "President 2024-2025",
      image: "/sai-bhaiya.jpg",
      profileImg: "/sai-bhaiya.jpg",
      username: "saiaryan",
      linkedin: "https://www.linkedin.com/in/saiaryangoswami"
    },
    {
      id: 4,
      name: "Tanveer Raza",
      skill: "Rust, Linux Systems Programming",
      role: "President 2021-2022",
      image: "/tanveer-bhaiya.jpg",
      profileImg: "/tanveer-bhaiya.jpg",
      username: "@tanveer",
      linkedin: "https://www.linkedin.com/in/atamakahere/"
    },
    {
      id: 5,
      name: "Abhinav Jha",
      skill: "UI/UX Designer",
      role: "President 2023-2024",
      image: "/abhinav-bhaiya.webp",
      profileImg: "/abhinav-bhaiya.webp",
      username: "@Abhinav",
      linkedin: "https://www.linkedin.com/in/abhijha301/"
    }
  ];

  const PresidentCard = ({ president }) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -20;
      const rotateY = ((x - centerX) / centerX) * 20;
      
      setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0 });
      setIsHovered(false);
    };

    return (
      <div
        className="relative w-full h-80 perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative w-full h-full transition-all duration-500 ease-out"
          style={{
            transform: `perspective(1500px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? 1.08 : 1}, ${isHovered ? 1.08 : 1}, ${isHovered ? 1.08 : 1})`,
            transformStyle: 'preserve-3d'
          }}
        >
          
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
            
            <img
              src={president.image}
              alt={president.name}
              className="w-full h-full object-cover"
            />
            
           
            <div className="absolute top-0 left-0 right-0 p-6 bg-linear-to-b from-black/70 via-black/40 to-transparent z-10">
              <h3 className="text-white text-2xl font-bold mb-2">{president.name}</h3>
              <p className="text-blue-300 text-sm font-medium mb-1">{president.skill}</p>
              <p className="text-gray-200 text-sm">{president.role}</p>
            </div>

          
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/20 backdrop-blur-md z-20">
              <div className="flex items-center justify-between">
               
                <div className="flex items-center gap-3">
                  <img
                    src={president.profileImg}
                    alt={president.name}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">{president.username}</p>
                    <p className="text-gray-200 text-xs">Online</p>
                  </div>
                </div>

                <a
                  href={president.linkedin}
                  className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-500 hover:shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div  className="min-h-screen  py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="lg:sticky lg:top-24   max-w-sm mt-48">
            <h1 className="text-5xl w-4xl font-bold text-gray-900 mb-7 leading-[1.1] ">
              Meet<br />Our Kitchen Crew
            </h1>
            
            <p className="text-base text-gray-500 font-light mb-6 leading-relaxed">
              We are a Team of passionate coders dedicated to advancing programming skills and creating opportunities for growth. With a mix of diverse talents, we collaborate to organize events, challenges, and workshops for our coding community.
            </p>
            
           
            <p className="text-base text-gray-500 font-light mb-10 leading-relaxed">
              Together, we're cooking up a collaborative coding culture that fuels learning, pushes boundaries, and serves up a hearty helping of innovation—with a side of creativity.
            </p>

            <a 
              href="/team"
              className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 mb-8 text-sm uppercase tracking-wide"
            >
              Explore Our Kitchen
            </a>

            <p className="text-3xl text-gray-900 leading-snug mt-5">
              <span className='font-light text-black/80'>Our Secret ingredient?</span><br />
              <span className="font-bold text-black"> Perfect code.</span>
            </p>
          </div>
           

          <div>
            <div 
              ref={row1Ref}
              className="grid grid-cols-2 gap-6 mb-6 transition-all duration-700 ease-out"
              style={{
                transform: `scale(${row1Scale})`,
                opacity: row1Scale
              }}
            >
              <PresidentCard president={presidents[0]} />
              <PresidentCard president={presidents[1]} />
            </div>
            
            <div 
              ref={row2Ref}
              className="max-w-sm mx-auto mb-6 transition-all duration-700 ease-out"
              style={{
                transform: `scale(${row2Scale})`,
                opacity: row2Scale
              }}
            >
              <PresidentCard president={presidents[2]} />
            </div>
            
            <div 
              ref={row3Ref}
              className="grid grid-cols-2 gap-6 transition-all duration-700 ease-out"
              style={{
                transform: `scale(${row3Scale})`,
                opacity: row3Scale
              }}
            >
              <PresidentCard president={presidents[3]} />
              <PresidentCard president={presidents[4]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExPresident;