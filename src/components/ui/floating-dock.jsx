import { cn } from "../../lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

export const FloatingDock = ({ items, className }) => {
  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
  "fixed bottom-6 left-1/2 -translate-x-1/2 flex h-14 md:h-16 items-end gap-3 md:gap-4 rounded-2xl bg-gray-50/30 dark:bg-neutral-900/30 px-3 md:px-4 pb-2 md:pb-3 backdrop-blur-sm border border-white/20 shadow-lg z-1000",
  className
)}

    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, href, onClick }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 70, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 70, 40]);
  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 35, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 35, 20]);

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
    >
      <motion.div
        ref={ref}
        style={{ width: widthTransform, height: heightTransform }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200/90 dark:bg-neutral-800/90 scale-90 sm:scale-100"
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 4, x: "-50%" }}
              transition={{ duration: 0.15 }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          style={{ width: widthTransformIcon, height: heightTransformIcon }}
          className="flex items-center justify-center text-neutral-800 dark:text-white"
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}