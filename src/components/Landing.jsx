import { motion, useScroll, useTransform } from "framer-motion";
import Galaxy from "./Galaxy";
import logo from "../assets/logo.png";
import { FloatingDock } from "./ui/floating-dock";
import { useNavigate } from "react-router-dom"; 
import {
  IconHome,
  IconCalendar,
  IconUsers,
  IconMail,
  IconTrophy,
} from "@tabler/icons-react";

export default function Landing() {
   const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const galaxyOpacity = useTransform(scrollYProgress, [0.45, 0.55], [1, 0]);

  // ✅ Smooth scrolling to sections
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };


 const navLinks = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#home",
      onClick: () => scrollToSection("#home"),
    },
    {
      title: "Events",
      icon: <IconCalendar className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/events", // ✅ Future route
      onClick: () => navigate("/events"),
    },
    {
      title: "Team",
      icon: <IconUsers className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/team", // ✅ Future route
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
      href: "#contact",
      onClick: () => scrollToSection("#contact"),
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

    
      <FloatingDock items={navLinks} />

    
      <div className="fixed inset-0 z-0 h-screen overflow-hidden">
        <motion.div style={{ opacity: galaxyOpacity }} className="w-full h-full">
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
        </motion.div>
      </div>

      <section
        id="home"
        className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between container mx-auto px-6 sm:px-8 lg:px-12 py-20 gap-16"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 text-center lg:text-left space-y-10 w-full lg:w-1/2"
        >
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center text-4xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight px-4 sm:px-6 md:px-8"
            >
              <div className="block w-full">
                <span className="font-bold text-white">Cooking</span>{" "}
                <span className="font-light text-white/80">code,</span>
              </div>

              <div className="block -ml-2 mt-2 sm:mt-3 w-full sm:w-4xl">
                <span className="font-bold text-white">Building</span>{" "}
                <span className="font-light text-white/80">community</span>
              </div>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4 mt-12 sm:mt-16 sm:ml-12"
          >
            <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-blue-400/40 cursor-pointer text-white font-semibold rounded-xl backdrop-blur-sm overflow-hidden transition-all duration-300 hover:scale-105">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </button>

            <button className="group relative cursor-pointer px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-white/20 text-white font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/40">
              <span className="relative z-10">Learn More</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </button>
          </motion.div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="relative flex items-center justify-center lg:justify-end h-96"
        >
          <div className="relative w-64 h-64" style={{ perspective: "1000px" }}>
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
                  className="absolute w-64 h-64 rounded-xl"
                  style={{
                    transform: t,
                    border: "2px solid rgba(221, 160, 221, 0.3)",
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

 
      <section
        id="events"
        className="relative min-h-screen bg-white text-black flex items-center justify-center"
      >
        <h2 className="text-4xl sm:text-5xl font-bold">Events Section</h2>
      </section>

      <section
        id="team"
        className="relative min-h-screen bg-gray-100 text-black flex items-center justify-center"
      >
        <h2 className="text-4xl sm:text-5xl font-bold">Team Section</h2>
      </section>

      <section
        id="achievements"
        className="relative min-h-screen bg-white text-black flex items-center justify-center"
      >
        <h2 className="text-4xl sm:text-5xl font-bold">Achievements Section</h2>
      </section>

      <section
        id="contact"
        className="relative min-h-screen bg-black text-white flex items-center justify-center"
      >
        <h2 className="text-4xl sm:text-5xl font-bold">Contact Section</h2>
      </section>
    </div>
  );
}
