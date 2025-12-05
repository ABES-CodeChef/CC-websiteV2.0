import React from "react";
import useLenis from "../hooks/useLenis";
import Footer from "../components/Footer";

const eventImages = [
  "/COC1.JPG",
  "/COC2.JPG",
  "/COC3.JPG",
  "/COC4.jpeg",
  "/COC5.jpeg",
  "/COC6.JPG",
];

const CodeClash2024Page = () => {
  useLenis();

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white text-black relative">
      <div className="relative z-10 min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-10 flex flex-col items-center">
        <header className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            Clash Of Coders <span className="text-orange-500"> 4.0</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 italic">
            Where Champions Are Coded.
          </p>
        </header>

        <main className="max-w-4xl w-full text-center md:text-left mb-16">
          <p className="text-lg text-gray-700 leading-relaxed">
            CodeClash 2024 was the ultimate arena for competitive programmers.
            Participants battled through a series of intense coding challenges,
            testing their problem-solving skills, speed, and efficiency. The
            event brought together the brightest minds to compete for glory and
            recognition.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            From mind-bending algorithms to complex data structures, CodeClash
            pushed every contestant to their limits. It was an electrifying
            showcase of talent and a celebration of the competitive spirit that
            drives the world of programming forward.
          </p>
        </main>

        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {eventImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`CodeClash 2024 event ${index + 1}`}
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

export default CodeClash2024Page;
