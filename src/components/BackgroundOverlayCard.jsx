"use client";
import { cn } from "../lib/utils";

export const BackgroundOverlayCard = ({
  title,
  description,
  imageUrl,
  hoverImageUrl,
  className,
}) => {
  const cardStyle = {
    '--bg-image': `url(${imageUrl})`,
    '--bg-image-hover': `url(${hoverImageUrl})`,
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        style={cardStyle}
        className={cn(
          "group w-full cursor-pointer overflow-hidden relative card aspect-[5/6] rounded-md shadow-xl shadow-orange-500 mx-auto flex flex-col justify-end p-4 border-2 border-white/20",
          "bg-cover bg-center bg-[image:var(--bg-image)] hover:bg-[image:var(--bg-image-hover)]",
          "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-30",
          "transition-all duration-500"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
        <div className="text relative z-50">
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
