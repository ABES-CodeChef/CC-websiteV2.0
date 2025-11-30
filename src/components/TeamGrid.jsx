import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingNav } from "../components/FloatingNavbar";
import {
  IconHome,
  IconCalendar,
  IconUsers,
  IconMail,
  IconTrophy,
} from "@tabler/icons-react";

export default function TeamGrid() {
  const [scales, setScales] = useState({});
  const itemRefs = useRef([]);
  const navigate = useNavigate();

  const scrollToSection = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
      href: "#achievements",
      onClick: () => scrollToSection("#achievements"),
    },
    {
      title: "Contact",
      icon: <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/contact",
      onClick: () => navigate("/contact"),
    },
  ];

  const teamMembers = [
    { name: 'Vishesh Maurya', role: 'Advisory', img: 1, row: 0, col: 0, transformOrigin: 'right bottom', linkedin: 'https://linkedin.com/in/alexjohnson' },
    { name: 'Sai Aryan Goswami', role: 'Core Team', img: 2, row: 0, col: 2, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/sarahchen' },
    { name: 'Vidhi Gandhi', role: 'President', img: 3, row: 1, col: 1, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/marcusrivera' },
    { name: 'Rohit Bhardwaj', role: 'Vice-president', img: 4, row: 2, col: 0, transformOrigin: 'right bottom', linkedin: 'https://linkedin.com/in/emilywatson' },
    { name: 'Lavish Aggarwal', role: 'Vice-president', img: 5, row: 2, col: 3, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/davidkim' },
    { name: 'Abhinav Vishwakarma', role: 'Development Lead', img: 6, row: 3, col: 1, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/lisathompson' },
    { name: 'Ramyak Jain', role: 'Event Lead', img: 7, row: 3, col: 2, transformOrigin: 'right bottom', linkedin: 'https://linkedin.com/in/jameswilson' },
    { name: 'Utkarsh', role: 'Cp Lead', img: 8, row: 4, col: 0, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/rachelgreen' },
    { name: 'Deepanshu', role: 'Graphics Lead', img: 9, row: 4, col: 3, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/michaelbrown' },
    { name: 'Swati Mittal', role: 'Pr Lead', img: 10, row: 5, col: 2, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/annadavis' },
    { name: 'Ananya', role: 'Content Lead', img: 11, row: 6, col: 1, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/tomanderson' },
    { name: 'Sakhi Vishnoi', role: 'Graphics Lead', img: 12, row: 6, col: 3, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/sophielee' },
    { name: 'Chris Taylor', role: 'Backend Developer', img: 13, row: 7, col: 0, transformOrigin: 'right bottom', linkedin: 'https://linkedin.com/in/christaylor' },
    { name: 'Maya Patel', role: 'Frontend Developer', img: 14, row: 7, col: 2, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/mayapatel' },
    { name: "Ryan O'Connor", role: 'Mobile Developer', img: 15, row: 8, col: 1, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/ryanoconnor' },
    { name: 'Zoe Martinez', role: 'Design Systems', img: 16, row: 9, col: 0, transformOrigin: 'right bottom', linkedin: 'https://linkedin.com/in/zoemartinez' },
    { name: 'Jordan Smith', role: 'Product Analyst', img: 17, row: 9, col: 3, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/jordansmith' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const newScales = {};
      
      itemRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const rect = ref.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const itemCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        
        const distance = Math.abs(itemCenter - viewportCenter);
        const maxDistance = windowHeight / 2 + rect.height / 2;
        
        let scale = 1 - (distance / maxDistance);
        scale = Math.max(0, Math.min(1, scale));
        
        newScales[index] = scale;
      });
      
      setScales(newScales);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const createGrid = () => {
    const grid = Array(10).fill(null).map(() => Array(4).fill(null));
    
    teamMembers.forEach((member, index) => {
      grid[member.row][member.col] = { ...member, index };
    });
    
    return grid;
  };

  const grid = createGrid();

  return (
    <section className="relative w-full bg-black text-white">
      <FloatingNav navItems={navLinks} />

      {/* Scroll indicator */}
      <div className="absolute left-1/2 top-24 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center">
        <span className="relative max-w-[12ch] text-xs uppercase leading-tight text-white/50 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:to-white/50 after:content-['']">
          scroll down to meet the teams
        </span>
      </div>

      {/* Sticky header */}
      <div className="pointer-events-none sticky top-1/2 z-20 -translate-y-1/2 text-center text-white mix-blend-difference">
        <h2 className="text-9xl font-semibold tracking-tighter">Teams</h2>
      </div>

      {/* Grid */}
      <div className="relative z-0 mb-[50vh] mt-[50vh]">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex w-full">
            {row.map((member, colIndex) => (
              <div key={colIndex} className="aspect-square flex-1">
                {member && (
                  <div 
                    ref={el => itemRefs.current[member.index] = el}
                    className="relative h-full w-full cursor-pointer"
                    style={{
                      transformOrigin: member.transformOrigin,
                      transform: `scale(${scales[member.index] || 0})`,
                      transition: 'transform 0.05s linear'
                    }}
                    onClick={() => window.open(member.linkedin, '_blank')}
                  >
                    <img
                      alt={member.name}
                      className="h-full w-full object-cover saturate-0 contrast-125 filter transition-all ease-in-out hover:scale-95"
                      src={`/${member.img}.webp`}
                    />
                    <div className="absolute -bottom-2 left-0 flex w-full translate-y-full justify-between text-center text-sm uppercase leading-tight opacity-40">
                      <p>{member.name}</p>
                      <p>({member.role})</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ height: '50vh' }} />
    </section>
  );
}