import React from "react";
import useLenis from "../hooks/useLenis";
import Footer from "../components/Footer";

const eventImages = [
  "/TERROR1.webp",
  "/TERROR2.webp",
  "/TERROR3.webp",
  "/TERROR4.webp",
];

const TError3Page = () => {
  useLenis();

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white text-black relative">
      <div className="relative z-10 min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-10 flex flex-col items-center">
        <header className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            T-Error<span className="text-orange-500"> 3.0</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 italic">
            Find the bug, be the hero.
          </p>
        </header>

        <main className="max-w-4xl w-full text-center md:text-left mb-16">
          <p className="text-lg text-gray-700 leading-relaxed">
            T-Error 3.0 was a thrilling debugging competition where participants
            raced against the clock to find and fix critical bugs in complex
            codebases. It was a true test of analytical skills, patience, and
            deep programming knowledge.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            This event challenged developers to think like detectives,
            meticulously tracing errors and implementing elegant solutions under
            pressure. T-Error 3.0 celebrated the unsung heroes of software
            development—the master debuggers.
          </p>
        </main>

        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {eventImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`T-Error 3.0 event ${index + 1}`}
              className="w-full h-auto object-cover rounded-lg shadow-lg shadow-orange-500/20"
            />
          ))}
        </div>
      </div>
      <div className="relative z-20 bg-white">
        <Footer />
      </div>
    </div>
  );
};

export default TError3Page;
