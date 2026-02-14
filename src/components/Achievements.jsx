import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github } from 'lucide-react';
import {
  IconHome,
  IconCalendar,
  IconUsers,
  IconMail,
  IconTrophy,
  IconLogout,
  IconDashboard,
} from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

import { FloatingNav } from '../components/FloatingNavbar';
import { useNavigate } from 'react-router-dom';

const AchievementsSection = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!wrapper || cards.length === 0) return;

    gsap.set(cards[0], { xPercent: 0 });
    gsap.set(cards.slice(1), { xPercent: 100 });

    const scrollTween = gsap.to(cards.slice(1), {
      xPercent: 0,
      ease: 'none',
      stagger: 0.5,
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: () => `+=${window.innerHeight * (cards.length - 1)}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const navLinks = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/",
      onClick: () => navigate("/"),
    },
    {
      title: "Events",
      icon: <IconCalendar className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/events",
      onClick: () => navigate("/events"),
    },
    {
      title: "Team",
      icon: <IconUsers className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/team",
      onClick: () => navigate("/team"),
    },
    {
      title: "Achievements",
      icon: <IconTrophy className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/achievements",
      onClick: () => navigate("/achievements"),
    },
    {
      title: "Contact",
      icon: <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/contact",
      onClick: () => navigate("/contact"),
    },
  ];

  // Add admin dashboard and logout button if user is logged in
  if (user) {
    if (user.role === 'admin') {
      navLinks.push({
        title: "Admin Dashboard",
        icon: <IconDashboard className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
        href: "/admin",
        onClick: () => navigate("/admin"),
      });
    }
    
    navLinks.push({
      title: "Logout",
      icon: <IconLogout className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
      onClick: handleLogout,
    });
  }

  const achievements = [
    {
      id: 1,
      image: '/ayush_png.webp',
      name: 'Ayush Tiwari',
      badge: 'Frontend Developer',
      description: 'Ayush Tiwari is a skilled Frontend Developer at JTG, with a focus on MERN and Web3 tech. He is committed to navigating the digital landscape and fostering innovation in web development. He thrives on collaborating with teams to create user-centric solutions',
      linkedin: 'https://www.linkedin.com/in/tiwari00ayush/',
      github: 'https://github.com/',
    },
    {
      id: 2,
      image: '/Ishan.webp',
      name: 'Ishan Grover',
      badge: 'Google Summer of Code',
      description: 'Ishan Grover, a successful intern in the esteemed Google Summer of Code (GSoC) program, received a stipend of $3,000. The achievement showcases his outstanding coding abilities and dedication to contributing to open-source projects',
      linkedin: 'https://www.linkedin.com/in/ishangrover2004/',
      github: 'https://github.com/',
    },
    {
      id: 3,
      image: '/kartik.webp',
      name: 'Kartik Pujari',
      badge: 'GATE 2024 Achiever',
      description: 'Kartik Pujari achieved an impressive score of 485 in GATE 2024, demonstrating his dedication and hard work in engineering. His outstanding performance reflects a strong commitment to academic excellence and a genuine passion for learning',
      linkedin: 'https://www.linkedin.com/in/kartikpujari001/',
      github: 'https://github.com/',
    }
  ];

  return (
    <div className="w-full bg-[#0a0a0a]">
      <FloatingNav navItems={navLinks} />
      
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col justify-center px-4 sm:px-6 font-[poppins] lg:px-8 bg-[#0a0a0a] pt-28 pb-12 md:pt-20 md:pb-16 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="max-w-8xl mx-auto w-full relative z-10 space-y-12 md:space-y-16">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight text-white">
              <span className="block mb-2 sm:mb-4">
                <span className="font-extrabold">Remarkable</span>{' '}
                <span className="font-extralight">Achievements</span>
              </span>
              <span className="block">
                <span className="font-extrabold">Celebrating</span>{' '}
                <span className="font-extralight">Excellence</span>
              </span>
            </h1>
          </div>

          {/* Achievement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Card 1 - Trophy */}
            <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 sm:p-8 hover:border-yellow-500/30 transition-all duration-300">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                  <IconTrophy className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-500" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Excellence in Innovation
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    Recognizing outstanding contributions to technology and creative problem-solving
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 - Medal (Hidden on mobile) */}
            <div className="hidden md:block bg-[#111111] border border-gray-800 rounded-2xl p-6 sm:p-8 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <svg 
                    className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" 
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Team Excellence
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    Celebrating collaborative success and collective achievements
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={wrapperRef} className="relative ">
        <div ref={containerRef} className="relative h-screen overflow-hidden">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              ref={el => cardsRef.current[index] = el}
              className="absolute top-0 left-0 w-full h-full"
            >
              <AchievementCard achievement={achievement} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AchievementCard = ({ achievement }) => {
  const imageRef = useRef(null);

  const handleMouseEnter = () => {
    if (!imageRef.current) return;
    
    gsap.to(imageRef.current, {
      y: -20,
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    
    gsap.to(imageRef.current, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  return (
    <div className="h-full flex items-start justify-center px-4 sm:px-6 lg:px-12 bg-[#0a0a0a] pt-16 md:pt-24">
      <div className="w-full max-w-6xl mx-auto">
        <div className="border-2 border-gray-700 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl bg-[#111111]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            <div 
              className="relative order-1 lg:order-1"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative overflow-hidden rounded-2xl border-2 border-gray-700">
                <img
                  ref={imageRef}
                  src={achievement.image}
                  alt={achievement.name}
                  className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] object-cover transition-all duration-400"
                />
              </div>
            </div>

            <div className="order-2 lg:order-2 space-y-4 sm:space-y-6 text-left">
              <div>
                <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[#1a1a1a] rounded-full mb-3 sm:mb-4 border border-gray-700">
                  <span className="text-xs sm:text-sm font-semibold text-gray-300">{achievement.badge}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
                  {achievement.name}
                </h2>
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                {achievement.description}
              </p>

              <div className="flex gap-3 sm:gap-4 pt-4 sm:pt-6">
                <a
                  href={achievement.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                
                <a
                  href={achievement.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 hover:scale-110"
                  title="GitHub"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsSection;