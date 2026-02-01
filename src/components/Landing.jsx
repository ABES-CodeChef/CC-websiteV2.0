import React, { useEffect, useState } from "react";
import ShuffleText from './ShuffleText2';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from 'axios';
import {
  IconHome,
  IconCalendar,
  IconUsers,
  IconMail,
  IconTrophy,
  IconLogout,
  IconDashboard,
} from "@tabler/icons-react";
import { toast } from 'react-hot-toast';
import "../styles/Landing.css";
import Squares from "./Squares";
import { FloatingNav } from "./FloatingNavbar";

const API_URL = 'http://localhost:5000/api';

export default function Landing() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [latestEvent, setLatestEvent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    // Fetch latest event
    fetchLatestEvent();
  }, []);

  const fetchLatestEvent = async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      if (response.data.events && response.data.events.length > 0) {
        // Get the most recent event (first one since they're ordered by created_at DESC)
        setLatestEvent(response.data.events[0]);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleRegisterClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!latestEvent) {
      toast.error('No events available for registration at the moment');
      return;
    }

    // Navigate to event registration page with the latest event ID
    navigate(`/event-registration/${latestEvent.id}`);
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

  return (
    <div className="relative w-full bg-black text-white overflow-x-hidden">
      <FloatingNav navItems={navLinks} />

      <section
        id="home"
        className="relative min-h-screen w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between overflow-hidden px-4 sm:px-6 md:px-10"
      >
        <motion.div className="absolute inset-0 h-full w-full z-0">
          <Squares
            speed={0.5}
            squareSize={40}
            direction="diagonal"
            borderColor="#111111"
            hoverFillColor="#222222"
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
                <ShuffleText text="Coding Together" className='text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-bold'/>
                <br />
                <ShuffleText text="Growing Together" className='text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-4'/>
                <br />
                <ShuffleText text="Code Collab Conquer" className='text-xl sm:text-2xl md:text-4xl lg:text-4xl font-bold'/>
                <div className="h-16 mt-3"></div>
              </div>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4 -mt-10"
          >
            <button 
              onClick={handleRegisterClick}
              className="group landing-btn-primary cursor-pointer"
            >
              <span className="relative z-10">
                {user ? 'Register for Event' : 'Get Started'}
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </button>

            <button 
              onClick={() => navigate('/events')}
              className="group landing-btn-secondary cursor-pointer"
            >
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
          <div
            className="relative w-64 h-64 cube"
            style={{ perspective: "1000px" }}
          >
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