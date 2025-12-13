import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github, Globe } from 'lucide-react';
import logo from "../../public/logo.png";
import {
  IconHome,
  IconCalendar,
  IconUsers,
  IconMail,
  IconTrophy,
} from "@tabler/icons-react";
import { FloatingNav } from "./FloatingNavbar";
import { useNavigate } from 'react-router-dom';


gsap.registerPlugin(ScrollTrigger);

const AchievementsSection = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!wrapper || cards.length === 0) return;

    // Set initial positions - first card visible (0%), others off screen to the right (100%)
    gsap.set(cards[0], { xPercent: 0 });
    gsap.set(cards.slice(1), { xPercent: 100 });

    // Create horizontal scroll animation for cards 2 and 3
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

    const navLinks = [
      {
        title: "Home",
        icon: (
          <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "/",
        onClick: () => navigate("/"),
      },
      {
        title: "Events",
        icon: (
          <IconCalendar className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "/events",
        onClick: () => navigate("/events"),
      },
      {
        title: "Team",
        icon: (
          <IconUsers className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "/team",
        onClick: () => navigate("/team"),
      },
      {
        title: "Achievements",
        icon: (
          <IconTrophy className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "/achievements",
        onClick: () => navigate("/achievements"),},
      {
        title: "Contact",
        icon: (
          <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "/contact",
        onClick: () => navigate("/contact"),
      },
    ];

  const achievements = [
    {
      id: 1,
      image: '/ayush_png.webp',
      name: 'Ayush Tiwari',
      // title: 'Best Innovation Award 2024',
      description: 'Ayush Tiwari is a skilled Frontend Developer at JTG, with a focus on MERN and Web3 tech.He is committed to navigating the digital landscape and fostering innovation in web development. He thrives on collaborating with teams to create user-centric solutions',
      linkedin: 'https://linkedin.com/in/alexjohnson',
      github: 'https://github.com/alexjohnson',
      website: 'https://alexjohnson.dev'
    },
    {
      id: 2,
      image: '/Ishan.webp',
      name: 'Ishan Grover',
      // title: 'Excellence in Design Award',
      description: 'Ishan Grover, a successful intern in the esteemed Google Summer of Code (GSoC) program, received a stipend of $3,000. The achievement showcases his outstanding coding abilities and dedication to contributing to open-source projects',
      linkedin: 'https://linkedin.com/in/sarahwilliams',
      github: 'https://github.com/sarahwilliams',
      website: 'https://sarahwilliams.design'
    },
    {
      id: 3,
      image: '/kartik.webp',
      name: 'Kartik Pujari ',
      // title: 'Team Leadership Achievement',
      description: 'Kartik Pujari achieved an impressive score of 485 in GATE 2024, demonstrating his dedication and hard work in engineering. His outstanding performance reflects a strong commitment to academic excellence and a genuine passion for learning',
      linkedin: 'https://linkedin.com/in/michaelchen',
      github: 'https://github.com/michaelchen',
      website: 'https://michaelchen.io'
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <div className="fixed top-4 left-4 z-50">
              <img
                src={logo}
                alt="CodeChef Logo"
                className="w-20 sm:w-16 md:w-20 lg:w-24 xl:w-28 object-contain"
              />
            </div>
      
            <FloatingNav navItems={navLinks} />
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="text-left max-w-8xl mx-auto">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl leading-tight text-gray-1000" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <span className="block mb-4">
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

      {/* Horizontal Sticky Scroll Section */}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Image */}
          <div 
            className="relative order-2 lg:order-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                ref={imageRef}
                src={achievement.image}
                alt={achievement.name}
                className="w-full h-[350px] sm:h-[400px] md:h-[450px] object-cover shadow-lg transition-all duration-400"
              />
            </div>
          </div>

          {/* Right Side - Description */}
          <div className="order-1 lg:order-2 space-y-6 text-left">
            <div>
              <div className="inline-block px-4 py-2 bg-gray-100 rounded-full mb-4">
                <span className="text-sm font-semibold text-gray-800">Award Winner</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {achievement.name}
              </h2>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-700 mb-6">
                {achievement.title}
              </h3>
            </div>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              {achievement.description}
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 pt-6">
              <a
                href={achievement.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
              >
                <Linkedin className="w-5 h-5" />
                <span className="font-medium text-sm">LinkedIn</span>
              </a>
              
              <a
                href={achievement.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105"
              >
                <Github className="w-5 h-5" />
                <span className="font-medium text-sm">GitHub</span>
              </a>

              <a
                href={achievement.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-5 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105"
              >
                <Globe className="w-5 h-5" />
                <span className="font-medium text-sm">Website</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsSection;