"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import logo_svg from "../assets/logo_svg.svg";

export const FloatingNav = ({ navItems, className }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    
    <motion.div
      className={cn(
          "flex w-full fixed top-0 inset-x-0 mx-auto border border-transparent dark:border-white/20 " +
            "transition-all duration-300 ease-in-out " +
            (scrolled 
              ? "bg-black border-white/10" 
              : "bg-black border-white/20"
            ) +
            " z-5000 px-8 py-3 items-center justify-between",
          className
        )}    
    >
      <div className="flex items-center space-x-4">
        <img src={logo_svg} alt="Logo" className="w-28 h-12 sm:w-20 md:w-24 lg:w-32 xl:w-40 object-contain" />
      </div>
      <div className="flex items-center space-x-6">
        {navItems.map((navItem, idx) => (
          <button
            key={`nav-${idx}`}
            onClick={navItem.onClick}
            className={cn(
              "relative flex items-center space-x-1 text-base font-medium cursor-pointer " +
                "text-neutral-700 dark:text-neutral-50 " +
                "transition-all duration-300 ease-out " + 
                "hover:text-neutral-900 dark:hover:text-neutral-300 hover:scale-105"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block">{navItem.title}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};
