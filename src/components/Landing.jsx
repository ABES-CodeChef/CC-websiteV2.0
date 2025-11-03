import { motion, useScroll, useTransform } from "framer-motion";
import Galaxy from "./Galaxy";

export default function Landing() {
  const { scrollYProgress } = useScroll();
  const galaxyOpacity = useTransform(scrollYProgress, [0.45, 0.55], [1, 0]);

  return (
    <div className="relative w-full bg-black text-white overflow-x-hidden">
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

      <section className="relative min-h-screen flex items-center">
        <div className="relative z-10 container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="space-y-4 max-w-4xl mx-auto px-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-7xl lg:text-8xl leading-tight text-center"
              >
                <span className="inline-block">
                  <span className="font-bold text-white">Cooking</span>
                  <span className="font-light text-white/80"> code,</span>
                </span>
                <br />
                <span className="inline-block w-4xl -ml-3">
                  <span className="font-bold text-white">Building</span>
                  <span className="font-light text-white/80"> community</span>
                </span>
              </motion.h1>
            </div>

         
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 ml-8 mt-24 text-xl"
            >
              <button className="group relative px-8 py-4 bg-transparent border border-blue-400/40 text-white font-semibold cursor-pointer   rounded-xl backdrop-blur-sm overflow-hidden transition-all duration-300 hover:scale-105">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-[1px]" />
              </button>

              <button className="group relative px-8 py-4 bg-transparent border border-white/20 text-white font-semibold cursor-pointer rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/40">
                <span className="relative z-10">Learn More</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-[1px]" />
              </button>
            </motion.div>
          </motion.div>

          
         <motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
  className="relative flex items-center justify-center lg:justify-end h-96"
>
  <div
    className="relative w-64 h-64"
    style={{
      perspective: "1000px",
    }}
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
      style={{
        transformStyle: "preserve-3d",
      }}
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
            // background:
            //   "linear-gradient(135deg, rgba(96,165,250,0.18), rgba(45,212,191,0.15))",
       border: "1px solid rgba(221, 160, 221, 0.3)" 
            // boxShadow:
            //   "inset 0 0 30px rgba(255,255,255,0.1), 0 0 40px rgba(59,130,246,0.25)",
            // backdropFilter: "blur(4px)",
          }}
        />
      ))}
    </motion.div>

   
  </div>
</motion.div>

        </div>
      </section>

   

      {/* === NEXT SECTION === */}
      <section className="relative min-h-screen bg-white text-black flex items-center justify-center">
        <h2 className="text-5xl font-bold">Next Section</h2>
      </section>
      <section className="relative min-h-screen bg-black text-black flex items-center justify-center">
        <h2 className="text-5xl font-bold">Next Section</h2>
      </section>
    </div>
  );
}
