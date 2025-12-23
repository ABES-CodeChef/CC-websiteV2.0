import React from "react";
import "../App.css";
import { PinContainer } from "./PinContainer";

const Offering = () => {
  return (
    <div className="offering-container font-sans w-full overflow-hidden py-10">
      <div className="offering-main flex flex-col justify-center items-center w-full ">
        
        
       <div className="text text-white text-center flex flex-col justify-center items-center w-full px-4">
  <h2 className="text-4xl md:text-4xl font-bold">
    Our <span>Initiatives</span>
  </h2>
  
  <p className="text-slate-400 text-lg mt-4 max-w-3xl leading-loose tracking-wide">
    Empowering students to code, collaborate, and create impactful tech solutions.
    <br className="hidden md:block" />
    We are building a community where curiosity meets execution. Through hands-on programs, mentorship, and innovation-driven events, we help students transform ideas into real-world solutions.
  </p>
</div>

       
   <div className="cards-container flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mt-10">


  <PinContainer 
    title="Coding WorkSpaces & Upskill" 
    href=""
    containerClassName="h-[30rem] w-full flex items-center justify-center"
  >
    <div className="flex flex-col cards bg-transparent backdrop-blur-sm p-4 tracking-tight text-slate-100/50 w-[80vw] max-w-[21rem] h-[25rem]">
      <h3 className="max-w-xs font-bold text-start text-base text-slate-100 pb-2">
        Coding WorkSpaces & Upskill
      </h3>
  
      <div className="text-base font-normal text-start leading-relaxed h-[4rem]">
        <span className="text-slate-500">
          We host coding workshops for hands-on practice for competitive programming.
        </span>
      </div>
      
 
      <img className="flex-1 w-full mt-4 rounded-lg object-cover" src="OUAC2.webp" alt="Coding Workspaces" />
    </div>
  </PinContainer>



  <PinContainer 
    title="Connect With Cool Mentors" 
    href="/events/byond-code"
    containerClassName="h-[30rem] w-full flex items-center justify-center"
  >
    <div className="flex flex-col cards bg-transparent backdrop-blur-sm p-4 tracking-tight text-slate-100/50 w-[80vw] max-w-[21rem] h-[25rem]">
     
      <h3 className="max-w-xs font-bold text-start text-base text-slate-100 pb-2">
        Connect With Cool Mentors
      </h3>
 
      <div className="text-base font-normal text-start leading-relaxed h-[4rem]">
        <span className="text-slate-500">
          Connect with Experienced mentors, seniors and explore new perspectives.
        </span>
      </div>
      
      <img className="flex-1 w-full mt-4 rounded-lg object-cover" src="bc1.webp" alt="Mentors" />
    </div>
  </PinContainer>


 
  <PinContainer 
    title="Innovation Hub" 
    href=""
    containerClassName="h-[30rem] w-full flex items-center justify-center"
  >
    <div className="flex flex-col cards bg-transparent backdrop-blur-sm p-4 tracking-tight text-slate-100/50 w-[80vw] max-w-[21rem] h-[25rem]">
     
      <h3 className="max-w-xs font-bold text-start text-base text-slate-100 pb-2">
        Innovation Hub
      </h3>
   
      <div className="text-base font-normal text-start leading-relaxed h-[4rem]">
        <span className="text-slate-500">
          Unlocking the potential of innovations and collaborating ideas and minds.
        </span>
      </div>
      
      <img className="flex-1 w-full mt-4 rounded-lg object-cover" src="TERROR2.webp" alt="Innovation Hub" />
    </div>
  </PinContainer>

</div>
      </div>
    </div>
  );
};

export default Offering;