import React from "react";
import useLenis from "../hooks/useLenis";
import Footer from "../components/Footer";

const eventImages = ["/OUAC1.webp", "/OUAC2.webp"];

const OnceUponACrimePage = () => {
  useLenis();

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white text-black relative">
      <div className="relative z-10 min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-10 flex flex-col items-center">
        <header className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            Once Upon A<span className="text-orange-500"> Crime</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 italic">
            A Murder Mystery of Logic & Code 🕵️‍♂️🔍🎭
          </p>
        </header>

        <main className="max-w-4xl w-full text-left mb-16 space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Case closed! A Murder Mystery pitted logic & code against a cunning
            culprit. Participants unraveled puzzles, cracked quizzes, & honed
            teamwork in a thrilling 2-day event.
          </p>
          <div>
            <h3 className="text-2xl font-bold text-orange-500 mb-2">
              Round 1: Whodunnit?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              With their detective hats firmly in place, individuals following
              the mystery faced a quiz with questions covering various domains.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-orange-500 mb-2">
              Round 2: Once Upon a Crime
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Following the thrilling whodunnit reveal, the stakes were raised
              with a high-energy treasure hunt. Armed with cryptic clues and
              hints in the campus, teams embarked on a thrilling adventure,
              racing against time to uncover the hidden killer.
            </p>
          </div>
        </main>

        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {eventImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Once Upon A Crime event ${index + 1}`}
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

export default OnceUponACrimePage;
