"use client";
import { cn } from "../lib/utils";

export const BackgroundOverlayCard = ({
  title,
  description,
  imageUrl,
  hoverImageUrl,
  className,
}) => {
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "group w-full cursor-pointer overflow-hidden relative card rounded-md shadow-xl/40 shadow-orange-400 mx-auto border-2 border-white/20",
          "transition-all duration-500"
        )}
      >
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-auto object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img 
          src={hoverImageUrl} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-4 z-30">
          <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
            {title}
          </h1>
          <p className="font-normal text-base text-gray-50 relative my-4 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
