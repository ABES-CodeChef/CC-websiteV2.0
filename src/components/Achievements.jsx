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
    <div className="w-full bg-white">
      <FloatingNav navItems={navLinks} />
      
      {/* Responsive Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 font-[poppins] lg:px-8 bg-white pt-20 md:pt-0">
        <div className="text-center md:text-left max-w-8xl mx-auto w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-8xl leading-tight text-black">
            <span className="block mb-2 sm:mb-4">
              <span className="font-extrabold">Celebrating</span>{' '}
              <span className="font-extralight">Our</span>
            </span>
            <span className="block">
              <span className="font-extrabold">Remarkable</span>{' '}
              <span className="font-extralight">Achievements</span>
            </span>
          </h1>
        </div>
      </div>

      <div ref={wrapperRef} className="relative">
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
    <div className="h-full flex items-center justify-center px-4 sm:px-6 lg:px-12 bg-white">
      <div className="w-full max-w-7xl mx-auto">
        <div className="border-2 border-gray-300 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
            <div 
              className="relative order-1 lg:order-1"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200">
                <img
                  ref={imageRef}
                  src={achievement.image}
                  alt={achievement.name}
                  className="w-full h-64 sm:h-80 md:h-96 lg:h-[450px] object-cover transition-all duration-400"
                />
              </div>
            </div>

            <div className="order-2 lg:order-2 space-y-4 sm:space-y-6 text-left">
              <div>
                <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 rounded-full mb-3 sm:mb-4 border border-gray-300">
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">{achievement.badge}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {achievement.name}
                </h2>
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
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
                  className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-110"
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