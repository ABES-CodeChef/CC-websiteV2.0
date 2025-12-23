"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import logo_svg from "../assets/logo_svg.svg";
import { useLocation } from "react-router-dom";

export const FloatingNav = ({ navItems, className }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Get active index based on current route
  const getActiveIndex = () => {
    const currentPath = location.pathname;
    const index = navItems.findIndex(item => item.href === currentPath);
    return index !== -1 ? index : 0;
  };

  const activeIndex = getActiveIndex();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  const handleNavClick = (onClick) => {
    onClick();
    setIsOpen(false);
  };

  return (
    <>
      {/* NAVBAR - Removed bounce animation */}
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 sm:px-8 py-3 transition-all duration-300",
          scrolled
            ? "bg-black/90 backdrop-blur border-b border-white/10"
            : "bg-black border-b border-white/20",
          className
        )}
      >
        {/* LOGO */}
        <img
          src={logo_svg}
          alt="Logo"
          className="w-24 sm:w-28 md:w-32 object-contain"
        />

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => handleNavClick(item.onClick)}
                className={cn(
                  "relative cursor-pointer text-base font-medium transition-colors",
                  isActive
                    ? "text-orange-500"
                    : "text-white hover:text-neutral-300"
                )}
              >
                {item.title}

                {/* Active underline */}
                {isActive && (
                  <motion.span
                    layoutId="active-underline"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-orange-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white relative z-50"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <X size={28} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, scale: 0.8, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -90, scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Menu size={28} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              className="absolute right-0 top-0 h-full w-3/4 p-8 pt-24 bg-black border-l border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col space-y-8">
                {navItems.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <motion.button
                      key={idx}
                      onClick={() => handleNavClick(item.onClick)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className={cn(
                        "flex items-center justify-between text-2xl font-medium transition-colors",
                        isActive
                          ? "text-orange-500"
                          : "text-white hover:text-neutral-300"
                      )}
                    >
                      {item.title}

                      {/* Active dot */}
                      {isActive && (
                        <motion.span
                          layoutId="active-dot"
                          className="w-2.5 h-2.5 bg-orange-500 rounded-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};