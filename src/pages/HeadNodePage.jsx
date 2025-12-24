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
  "/hn1.webp",
  "/hn2.webp",
  "/hn3.webp",
  "/hn4.webp",
];

const HeadNodePage = () => {
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
            Head<span className="text-orange-500"> Node</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 italic">
            Insight Exchange: Guiding Through Experience 💡🤝
          </p>
        </motion.header>

        <div className="w-full max-w-6xl space-y-24">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          >
            <div className="w-full md:w-1/2">
              <img src={eventImages[0]} alt="Head Node event 1" className="w-full h-auto object-cover rounded-lg shadow-lg shadow-orange-500/20" />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <p className="text-lg text-gray-200 leading-relaxed">
                A dynamic exchange of knowledge and experience as seasoned seniors shared insights, answered queries, and guided juniors for a collaborative learning experience.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
          >
            {eventImages.slice(1).map((src, index) => (
              <img key={index} src={src} alt={`Head Node event ${index + 2}`} className="w-full h-auto object-cover rounded-lg shadow-lg shadow-orange-500/20" />
            ))}
          </motion.div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default HeadNodePage;