import React from 'react';
import { motion } from 'framer-motion';
import useLenis from '../hooks/useLenis';
// import Footer from '../components/Footer';
import Particles from '../components/particles';
import { FloatingNav } from "../components/FloatingNavbar";
import {
  IconHome,
  IconCalendar,
  IconUsers,
  IconMail,
  IconTrophy,
} from "@tabler/icons-react";
import { useNavigate } from 'react-router-dom';

const eventImages = [
  "/TERROR1.webp",
  "/TERROR2.webp",
  "/TERROR3.webp",
  "/TERROR4.webp",
];

const TError3Page = () => {
  useLenis();
    const navigate = useNavigate();
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
    <div className="w-full min-h-screen overflow-x-hidden bg-black text-white relative">
                      <FloatingNav navItems={navLinks} />
      <div className="fixed inset-0 z-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="relative z-10 min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-10 flex flex-col items-center">
        <motion.header 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            T-Error<span className="text-orange-500"> 3.0</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 italic">
            Find the bug, be the hero.
          </p>
        </motion.header>

        <motion.main 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-4xl w-full text-center md:text-left mb-16"
        >
          <p className="text-lg text-gray-200 leading-relaxed">
            T-Error 3.0 was a thrilling debugging competition where participants raced against the clock to find and fix critical bugs in complex codebases. It was a true test of analytical skills, patience, and deep programming knowledge.
          </p>
          <p className="text-lg text-gray-200 leading-relaxed mt-4">
            This event challenged developers to think like detectives, meticulously tracing errors and implementing elegant solutions under pressure. T-Error 3.0 celebrated the unsung heroes of software development—the master debuggers.
          </p>
        </motion.main>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
        >
          {eventImages.map((src, index) => (
            <img key={index} src={src} alt={`T-Error 3.0 event ${index + 1}`} className="w-full h-auto object-cover rounded-lg shadow-lg shadow-orange-500/20" />
          ))}
        </motion.div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default TError3Page;