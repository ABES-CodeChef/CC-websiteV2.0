import React from "react";
import useLenis from "../hooks/useLenis";
import Footer from "../components/Footer";

const eventImages = [
  "/rust1.webp",
  "/rust2.webp",
  "/rust3.webp",
  "/rust7.webp",
];

const RustEdPage = () => {
  useLenis();

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white text-black relative">
      <div className="relative z-10 min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-10 flex flex-col items-center">
        <header className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            Rust<span className="text-orange-500">-</span>Ed
          </h1>
          <p className="text-lg md:text-xl text-gray-700 italic">
            Code with Power, Build with Clout, Rust It Out!
          </p>
        </header>

        <main className="max-w-4xl w-full text-center md:text-left mb-16">
          <p className="text-lg text-gray-700 leading-relaxed">
            Rust-Ed was an exciting gathering dedicated to the Rust programming
            language, bringing together a vibrant community of developers,
            enthusiasts, where experts came to share knowledge, best practices,
            and innovative techniques that showcase Rust's unique strengths in
            creating reliable and efficient software.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Overall, Rust-Ed was a milestone event, reinforcing the importance
            of Rust in modern programming while equipping attendees with the
            tools and insights necessary for their coding journeys.
          </p>
        </main>
        <img
          src="/rust4.webp"
          alt="main event"
          className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 m-16"
        />
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {eventImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Rust-Ed event ${index + 1}`}
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

export default RustEdPage;
