import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  IconHome,
  IconCalendar,
  IconUsers,
  IconMail,
  IconTrophy,
} from "@tabler/icons-react";
import "../styles/Landing.css";
import Squares from './Squares';

import Galaxy from "../components/Galaxy";
import { FloatingNav } from "./FloatingNavbar";
import logo from "../../public/logo.png";

export default function Landing() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const galaxyOpacity = useTransform(scrollYProgress, [0.45, 0.55], [1, 0]);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
  {
    title: "Home",
    icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "#home",
    onClick: () => navigate("/home"),
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


  return (
    <div className="relative w-full bg-black text-white overflow-x-hidden">
   
      <div className="fixed top-4 left-4 z-50">
        <img
          src={logo}
          alt="CodeChef Logo"
          className="w-20 sm:w-16 md:w-20 lg:w-24 xl:w-28 object-contain"
        />
      </div>

      
      <FloatingNav navItems={navLinks} />

     
      <section
      
        id="home"
        className="relative min-h-screen w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between overflow-hidden px-4 sm:px-6 md:px-10"
      >
       
        {/* <motion.div
          style={{ opacity: galaxyOpacity }}
          className="absolute inset-0 h-full w-full z-0"
        >
          <Galaxy
            mouseRepulsion
            mouseInteraction
            density={0.3}
            glowIntensity={0.4}
            saturation={0.6}
            hueShift={200}
            speed={0.9}
            twinkleIntensity={0.3}
            rotationSpeed={0.05}
          />
        </motion.div> */}

<motion.div className="absolute inset-0 h-full w-full z-0">
  <Squares 
    speed={0.5} 
    squareSize={40}
    direction='diagonal'
    borderColor='#111111'
    hoverFillColor='#222222'
  />
</motion.div>
    
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 text-center lg:text-left space-y-10 w-full lg:w-1/2 landing-text"
        >
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-bold leading-[1.1] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mx-auto lg:mx-0 text-center lg:text-left"
            >
              <div>
                <span className="font-bold text-white">Cooking</span>{" "}
                <span className="font-light text-white/80">code,</span>
              </div>
              <div className="mt-2 sm:mt-3">
                <span className="font-bold text-white">Building</span>{" "}
                <span className="font-light text-white/80">community</span>
              </div>
            </motion.h1>
          </div>

         
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4 mt-12"
          >
            <button className="group landing-btn-primary cursor-pointer">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </button>

            <button className="group landing-btn-secondary cursor-pointer">
              <span className="relative z-10">Learn More</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </button>
          </motion.div>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex items-center justify-center lg:justify-end h-96 w-full lg:w-1/2 cube-container"
        >
          <div className="relative w-64 h-64 cube" style={{ perspective: "1000px" }}>
            <motion.div
              animate={{
                rotateX: 360,
                rotateY: 360,
              }}
              transition={{
                rotateX: { duration: 20, repeat: Infinity, ease: "linear" },
                rotateY: { duration: 26, repeat: Infinity, ease: "linear" },
              }}
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {[
                "translateZ(128px)",
                "rotateY(90deg) translateZ(128px)",
                "rotateY(180deg) translateZ(128px)",
                "rotateY(-90deg) translateZ(128px)",
                "rotateX(90deg) translateZ(128px)",
                "rotateX(-90deg) translateZ(128px)",
              ].map((t, i) => (
                <div
                  key={i}
                  className="absolute w-64 h-64 rounded-xl border border-[rgba(221,160,221,0.3)]"
                  style={{ transform: t }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
