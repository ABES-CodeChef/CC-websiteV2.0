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
import "../styles/Landing.css";
import { FloatingNav } from "./FloatingNavbar";
import Galaxy from "./Galaxy";

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
      alert('No events available for registration at the moment');
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
      <div className="absolute inset-0 z-0">
        <Galaxy
          focal={[0.5, 0.5]}
          rotation={[1.0, 0.0]}
          starSpeed={0.5}
          density={1.5}
          hueShift={140}
          disableAnimation={false}
          speed={1.0}
          mouseInteraction={true}
          glowIntensity={0.3}
          saturation={0.0}
          mouseRepulsion={true}
          repulsionStrength={2}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          autoCenterRepulsion={0}
          transparent={true}
        />
      </div>
      <FloatingNav navItems={navLinks} />

      <section
        id="home"
        className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 text-center space-y-10 w-full max-w-5xl landing-text"
        >
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-bold leading-[1.1] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mx-auto text-center"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-5xl sm:text-7xl md:text-8xl lg:text-8xl font-bold">
                  <ShuffleText text="Coding" /> <ShuffleText text="Together" className="text-orange-500" />
                </span>
                <span className="text-5xl sm:text-7xl md:text-8xl lg:text-8xl font-bold mb-4">
                  <ShuffleText text="Growing" /> <ShuffleText text="Together" className="text-orange-500" />
                </span>
                <ShuffleText text="Code Collab Conquer" className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold'/>
                <div className="h-16 mt-3"></div>
              </div>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 -mt-10"
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
      </section>
    </div>
  );
}