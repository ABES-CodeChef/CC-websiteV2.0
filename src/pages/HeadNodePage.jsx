import React from "react";
import useLenis from "../hooks/useLenis";
import Footer from "../components/Footer";

const eventImages = ["/hn1.webp", "/hn2.webp", "/hn3.webp", "/hn4.webp"];

const HeadNodePage = () => {
  useLenis();

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white text-black relative">
      <div className="relative z-10 min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-10 flex flex-col items-center">
        <header className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            Head<span className="text-orange-500"> Node</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 italic">
            Insight Exchange: Guiding Through Experience 💡🤝
          </p>
        </header>

        <main className="max-w-4xl w-full text-center md:text-left mb-16">
          <p className="text-lg text-gray-700 leading-relaxed">
            A dynamic exchange of knowledge and experience as seasoned seniors
            shared insights, answered queries, and guided juniors for a
            collaborative learning experience.
          </p>
        </main>

        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {eventImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Head Node event ${index + 1}`}
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

export default HeadNodePage;
