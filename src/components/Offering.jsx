import React from "react";
import "../App.css";
import { PinContainer } from "./PinContainer";
import Spline from '@splinetool/react-spline'


const Offering = () => {
  return (
    <div className='offering-container font-sans'>
<div className="offering-main flex flex-col justify-around items-center mb-20 md:gap-2 gap-20">
    <div className="text relative md:left-20 md:top-10 text-white">
        <h2>Our <span>Initiatives</span></h2>
        <p className="text-slate-400 text-lg mt-2">
  Empowering students to code, collaborate, and create impactful tech solutions.
</p>
    </div>
 {/* <div className="relative md:left-60 md:h-[40vh] md:w-[50vw]" style={{ width: "100vw", height: "62vh" }}>
<Spline scene="https://prod.spline.design/AFxRpmT1cXG77p3F/scene.splinecode" />
   <div
    style={{
      position: "absolute",
      bottom: 20,
      right: 20,
      width: "300px",
      height: "50px",
      background: "black",
    }}
  />
</div>
</div>
    <div className="cards-container flex md:flex-row flex-col justify-center "> */}
    <div className="cards-container flex flex-col md:flex-row justify-center items-center md:items-stretch md:gap-10 gap-20 ">
      <PinContainer
        title=" Coding WorkSpaces & Upskill"
        href=""
      >
        <div className="flex flex-col cards bg-transparent backdrop-blur-sm p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[25rem] ">
          <h3 className="max-w-xs  font-bold text-start  text-base text-slate-100">
         Coding WorkSpaces & Upskill
          </h3>
          <div className="text-base font-normal text-start leading-relaxed">
            <span className="text-slate-500 ">
              We host coding workshops for hands-on practice and help participants upskill by applying these techniques in competitive environments.

            </span>
          </div>
          <div className="flex flex-1 w-full h-100 rounded-lg mt-4 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0ea5e9]" />
        </div>
      </PinContainer>

      <PinContainer
       title="Connect With Cool Mentors"
        href=""
      >
        <div className="flex flex-col cards    bg-transparent backdrop-blur-sm p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[22rem] h-[25rem] md:h-[30rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold text-start  text-base text-slate-100">
      Connect With Cool Mentors
          </h3>
          <div className="text-base !m-0 !p-0 font-normal text-start leading-relaxed">
            <span className="text-slate-500 ">
Connect with Experienced mentors,seniors and explore new perspectives.
            </span>
          </div>
          <div className="flex flex-1 w-full h-100 rounded-lg mt-4 bg-gradient-to-br from-[#1a1b26] via-[#4f46e5] to-[#0d9488]/60" />
        </div>
      </PinContainer>

      <PinContainer
        title="Innovation Hub"
        href=""
      >
        <div className="flex basis-full flex-col cards  bg-transparent backdrop-blur-sm p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[25rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold text-start  text-base text-slate-100">
     Innovation Hub
          </h3>
          <div className="text-base !m-0 !p-0 font-normal text-start leading-relaxed">
            <span className="text-slate-500 ">
Unlocking the potential of innovations and collaborating ideas and minds to create the best!
            </span>
          </div>
          <div className="flex flex-1 w-full h-100 rounded-lg mt-4 bg-gradient-to-br from-indigo-900 via-purple-800 to-slate-900" />
        </div>
      </PinContainer>



   
    </div>
    
     
   
    </div>

    </div>
  );
};

export default Offering;
