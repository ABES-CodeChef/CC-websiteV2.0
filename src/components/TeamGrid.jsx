import { useScroll } from '@react-three/drei';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconHome,
  IconCalendar,
  IconUsers,
  IconMail,
  IconTrophy,
} from "@tabler/icons-react";


import { FloatingNav } from "./FloatingNavbar";

export default function TeamGrid() {
  const [scales, setScales] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const itemRefs = useRef([]);
  const navigate = useNavigate();
 

  const teamMembers = [
    { name: 'Vishesh Dudeja', role: 'Advisory',  row: 0, col: 0, transformOrigin: 'right bottom',img:'1.webp', linkedin: 'https://linkedin.com/in/vishesh-dudeja-b62a79242', tech: ['Python', 'Django', 'AWS'] },
    { name: 'Sai Aryan Goswami', role: 'Core Team',  row: 0, col: 2, transformOrigin: 'left bottom',img:'2.webp', linkedin: 'https://linkedin.com/in/saiaryangoswami', tech: ['React', 'Next.js', 'PostgreSQL'] },
    { name: 'Vidhi Gandhi', role: 'President', row: 1, col: 1, transformOrigin: 'left bottom',img:'vidhi-didi.jpg', linkedin: 'https://linkedin.com/in/vidhi-gandhi-640806296', tech: ['Figma', 'Adobe XD', 'Sketch'] },
    { name: 'Rohit Bhardwaj', role: 'Vice-president',  row: 2, col: 0, transformOrigin: 'right bottom',img:'rohit-bhaiya.jpg', linkedin: 'https://linkedin.com/in/dev-rohitbhardwaj', tech: ['solidity', 'Web3', 'Open Source'] },
    { name: 'Lavish Aggarwal', role: 'Vice-president', row: 2, col: 3, transformOrigin: 'left bottom', img:'lavish-bhaiya.jpg',  linkedin: 'https://linkedin.com/in/lavishagrwl', tech: ['JavaScript', 'TypeScript', 'Vue.js'] },
    { name: 'Abhinav Vishwakarma', role: 'Development Lead',  row: 3, col: 1, transformOrigin: 'left bottom',img:'abhinav-bhaiya.jpg', linkedin: 'https://linkedin.com/in/abhinav-vishwakarma-fsd', tech: ['React', 'Next.js', 'Tailwind'] },
    { name: 'Ramyak Jain', role: 'Event Lead',  row: 3, col: 2, transformOrigin: 'right bottom',  linkedin: 'https://linkedin.com/in/ramyak-jain', tech: ['User Research', 'Prototyping', 'Testing'] },
    { name: 'Utkarsh Saxena', role: 'Cp Lead',row: 4, col: 0, transformOrigin: 'left bottom',img:'utkarsh-bhaiya.jpg', linkedin: 'https://linkedin.com/in/utkarsh-saxena-91005a290', tech: ['C++', 'Algorithms', 'DSA'] },
    { name: 'Deepanshu', role: 'Graphics Lead', row: 4, col: 3, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/deepanshu-kaushik-174059297', tech: ['Photoshop', 'Illustrator', 'After Effects'] },
    { name: 'Swati Mittal', role: 'Pr Lead', row: 5, col: 1, transformOrigin: 'left bottom',img:'swati-didi.jpg', linkedin: 'https://linkedin.com/in/swati-mittal24', tech: ['Social Media', 'Outreach', 'Networking'] },
    { name: 'Ananya', role: 'Content Lead', row: 6, col: 1, transformOrigin: 'left bottom',img:'ananya-didi.jpg', linkedin: 'https://linkedin.com/in/', tech: ['Copywriting', 'SEO', 'Content Strategy'] },
    { name: 'Sakhi Vishnoi', role: 'Graphics Lead', row: 6, col: 3, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/sakshi-vishnoi-7770b2315', tech: ['Canva', 'Figma', 'Blender'] },
    { name: 'Anvesh Srivastava ', role: 'Backend Developer', row: 7, col: 0, transformOrigin: 'right bottom',img:'anvesh-bhaiya.jpg', linkedin: 'https://linkedin.com/in/anvesh-srivastava', tech: ['Node.js', 'Express', 'MongoDB'] },
    { name: 'kaif azmi', role: 'Frontend Developer', row: 7, col: 2, transformOrigin: 'left bottom',img:'kaif-bhaiya.jpg', linkedin: 'https://linkedin.com/in/kaifazmi', tech: ['React', 'CSS', 'JavaScript'] },
    { name: "Bhaskar Dwivedi", role: 'Mobile Developer', row: 8, col: 1, transformOrigin: 'left bottom',img:'bhaskar-bhaiya.jpg', linkedin: 'https://linkedin.com/in/bhaskar-dwi', tech: ['React Native', 'Flutter', 'Swift'] },
    { name: 'Dhruv Khare', role: 'Design Systems', row: 9, col: 0, transformOrigin: 'right bottom',img:'dhruv-bhaiya.jpg', linkedin: 'https://linkedin.com/in/dhruvkhare-softwaredev', tech: ['Storybook', 'Design Tokens', 'Figma'] },
    { name: 'Amit Gupta', role: 'Product Analyst', row: 9, col: 3, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/', tech: ['Analytics', 'SQL', 'Tableau'] }
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


  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
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

  return (
    <div className="relative w-full bg-black text-white overflow-x-hidden">
      
            <FloatingNav navItems={navLinks} />

    <section className="relative w-full bg-black text-white">
     
      <div className="absolute left-1/2 top-24 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center">
        <span className="relative max-w-[12ch] text-xs uppercase leading-tight text-white/50 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:to-white/50 after:content-['']">
          scroll down to meet the teams
        </span>
      </div>

      <div className="pointer-events-none sticky top-1/2 z-20 -translate-y-1/2 text-center text-white mix-blend-difference">
        <h2 className="text-9xl font-semibold tracking-tighter">Teams</h2>
      </div>

     
      <div className="relative z-0 mb-[50vh] mt-[50vh]">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex w-full">
            {row.map((member, colIndex) => (
              <div key={colIndex} className="aspect-square flex-1">
                {member && (
                  <div 
                    ref={el => itemRefs.current[member.index] = el}
                    className="relative h-full w-full cursor-pointer group"
                    style={{
                      transformOrigin: member.transformOrigin,
                      transform: `scale(${scales[member.index] || 0})`,
                      transition: 'transform 0.05s linear'
                    }}
                    onClick={() => window.open(member.linkedin, '_blank')}
                    onMouseEnter={() => setHoveredIndex(member.index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <img
                      alt={member.name}
                      className={`h-full w-full object-cover object-[center_top] contrast-125 filter transition-all duration-300 ease-in-out group-hover:scale-95 ${
                        hoveredIndex === member.index ? '' : 'saturate-0'
                      }`}
                     src={member.img}
                    />
                    
                   
                  <div
  className={`absolute inset-0 bg-black/40 backdrop-blur-sm 
    flex flex-col items-center justify-center 
    gap-2 sm:gap-3 
    transition-opacity duration-300 
    ${hoveredIndex === member.index ? 'opacity-100' : 'opacity-0 pointer-events-none'}
  `}
>

  <h3 className="text-sm xs:text-base sm:text-lg font-bold uppercase tracking-wider text-center px-2 leading-tight">
    {member.name}
  </h3>


  <p className="text-[0.6rem] xs:text-[0.7rem] sm:text-sm text-white/60 uppercase text-center px-2 leading-tight">
    {member.role}
  </p>


  <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2 justify-center px-2 sm:px-4 mt-1 sm:mt-2">
    {member.tech.map((tech, i) => (
      <span
        key={i}
        className="px-1.5 xs:px-2 sm:px-3 py-0.5 sm:py-1 
          bg-white/10 backdrop-blur-sm 
          rounded-full 
          text-[0.55rem] xs:text-[0.6rem] sm:text-xs 
          font-medium 
          border border-white/20
          whitespace-nowrap
        "
      >
        {tech}
      </span>
    ))}
  </div>
</div>


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
        </div>
  );
}