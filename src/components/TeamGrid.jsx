import React, { useEffect, useState, useRef } from 'react';

export default function TeamGrid() {
  const [scales, setScales] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const itemRefs = useRef([]);

  const teamMembers = [
    { name: 'Vishesh Maurya', role: 'Advisory', img: 1, row: 0, col: 0, transformOrigin: 'right bottom', linkedin: 'https://linkedin.com/in/alexjohnson', tech: ['React', 'Node.js', 'AWS'] },
    { name: 'Sai Aryan Goswami', role: 'Core Team', img: 2, row: 0, col: 2, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/sarahchen', tech: ['Python', 'Django', 'PostgreSQL'] },
    { name: 'Vidhi Gandhi', role: 'President', img: 3, row: 1, col: 1, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/marcusrivera', tech: ['Figma', 'Adobe XD', 'Sketch'] },
    { name: 'Rohit Bhardwaj', role: 'Vice-president', img: 4, row: 2, col: 0, transformOrigin: 'right bottom', linkedin: 'https://linkedin.com/in/emilywatson', tech: ['Jira', 'Agile', 'Scrum'] },
    { name: 'Lavish Aggarwal', role: 'Vice-president', img: 5, row: 2, col: 3, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/davidkim', tech: ['JavaScript', 'TypeScript', 'Vue.js'] },
    { name: 'Abhinav Vishwakarma', role: 'Development Lead', img: 6, row: 3, col: 1, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/lisathompson', tech: ['React', 'Next.js', 'Tailwind'] },
    { name: 'Ramyak Jain', role: 'Event Lead', img: 7, row: 3, col: 2, transformOrigin: 'right bottom', linkedin: 'https://linkedin.com/in/jameswilson', tech: ['User Research', 'Prototyping', 'Testing'] },
    { name: 'Utkarsh', role: 'Cp Lead', img: 8, row: 4, col: 0, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/rachelgreen', tech: ['C++', 'Algorithms', 'DSA'] },
    { name: 'Deepanshu', role: 'Graphics Lead', img: 9, row: 4, col: 3, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/michaelbrown', tech: ['Photoshop', 'Illustrator', 'After Effects'] },
    { name: 'Swati Mittal', role: 'Pr Lead', img: 10, row: 5, col: 2, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/annadavis', tech: ['Social Media', 'Outreach', 'Networking'] },
    { name: 'Ananya', role: 'Content Lead', img: 11, row: 6, col: 1, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/tomanderson', tech: ['Copywriting', 'SEO', 'Content Strategy'] },
    { name: 'Sakhi Vishnoi', role: 'Graphics Lead', img: 12, row: 6, col: 3, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/sophielee', tech: ['Canva', 'Figma', 'Blender'] },
    { name: 'Chris Taylor', role: 'Backend Developer', img: 13, row: 7, col: 0, transformOrigin: 'right bottom', linkedin: 'https://linkedin.com/in/christaylor', tech: ['Node.js', 'Express', 'MongoDB'] },
    { name: 'Maya Patel', role: 'Frontend Developer', img: 14, row: 7, col: 2, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/mayapatel', tech: ['React', 'CSS', 'JavaScript'] },
    { name: "Ryan O'Connor", role: 'Mobile Developer', img: 15, row: 8, col: 1, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/ryanoconnor', tech: ['React Native', 'Flutter', 'Swift'] },
    { name: 'Zoe Martinez', role: 'Design Systems', img: 16, row: 9, col: 0, transformOrigin: 'right bottom', linkedin: 'https://linkedin.com/in/zoemartinez', tech: ['Storybook', 'Design Tokens', 'Figma'] },
    { name: 'Jordan Smith', role: 'Product Analyst', img: 17, row: 9, col: 3, transformOrigin: 'left bottom', linkedin: 'https://linkedin.com/in/jordansmith', tech: ['Analytics', 'SQL', 'Tableau'] }
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
                      className={`h-full w-full object-cover contrast-125 filter transition-all duration-300 ease-in-out group-hover:scale-95 ${
                        hoveredIndex === member.index ? '' : 'saturate-0'
                      }`}
                     src={`https://picsum.photos/seed/${member.img}/800/800`}
                    />
                    
                    {/* Tech Stack Overlay */}
                    <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center gap-3 transition-opacity duration-300 ${
                      hoveredIndex === member.index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}>
                      <h3 className="text-lg font-bold uppercase tracking-wider">{member.name}</h3>
                      <p className="text-sm text-white/60 uppercase">{member.role}</p>
                      <div className="flex flex-wrap gap-2 justify-center px-4 mt-2">
                        {member.tech.map((tech, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium border border-white/20"
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
  );
}