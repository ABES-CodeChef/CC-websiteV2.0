"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

export const FloatingNav = ({ navItems, className }) => {
  return (
    <div
      className={cn(
        "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/20 " +
          "rounded-3xl dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] " +
          "z-5000 px-8 py-3 items-center justify-center space-x-6",
        className
      )}
    >
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
  );
};
