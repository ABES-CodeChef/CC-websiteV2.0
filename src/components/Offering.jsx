import React, { useState, useEffect, useRef } from "react";
import "../App.css";

const Offering = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = 4;
  const baseRotation = -5;
  const itemSpacing = 12;
  const rotateVal = -(activeIndex * itemSpacing);

  const contentData = [
    {
      title: "Coding\nWorkSpaces",
      desc: "Immersive coding environments designed for focus and productivity. We host competitive programming workshops, hackathons, and hands-on bootcamps to sharpen your skills.",
      img: "/OUAC2.webp"
    },
    {
      title: "Connect With\nCool Mentors",
      desc: "Bridge the gap between learning and industry. Connect with experienced developers, alumni, and tech leaders who provide guidance, code reviews, and career advice.",
      img: "/rust7.webp"
    },
    {
      title: "Innovation\nHub",
      desc: "A collaborative space where wild ideas turn into reality. We provide the resources, peer support, and brainstorming sessions needed to launch your next big project.",
      img: "/COC3.JPG"
    },
    {
      title: "Community\nEvents",
      desc: "Join a thriving network of tech enthusiasts. From casual meetups to tech talks and networking nights, we foster a culture of sharing knowledge and growing together.",
      img: "/COC1.JPG"
    },
  ];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveIndex((prev) => (prev + 1) % totalItems);
  //   }, 4000); 
  //   return () => clearInterval(interval);
  // }, []);

  const [slideAmount, setSlideAmount] = useState(300);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [isMobile, setIsMobile] = useState(false);
  const [wheelConfig, setWheelConfig] = useState({
    radius: 510,
    rotateOffset: -250,
    scale: 0.9
  });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlideAmount(632);
        setIsMobile(false);
        setWheelConfig({ radius: 510, rotateOffset: -250, scale: 0.9 });
      } else if (window.innerWidth >= 768) {
        setSlideAmount(375);
        setIsMobile(false);
        setWheelConfig({ radius: 450, rotateOffset: -200, scale: 0.8 });
      } else {
        setSlideAmount(200);
        setIsMobile(true);
        setWheelConfig({ radius: 250, rotateOffset: -50, scale: 0.55 });
      }
    };


    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalItems);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  return (
    <section
      id="wheel"
      className="relative w-full h-auto min-h-[450px] sm:min-h-[800px] md:min-h-[1000px] lg:min-h-[1200px] bg-transparent md:bg-black flex flex-col justify-center items-center border-t-2 border-white z-50 overflow-visible pb-0"
      style={{ cursor: `url("/wheel/hand.svg"), auto` }}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 w-full h-full z-0 bg-black overflow-hidden pointer-events-none">
        <div
          className="absolute inset-[-50%] w-[200%] h-[200%] animate-spin-slow opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'url("/wheel/rays.svg")',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.6) 70%, black 100%)' }}
        ></div>
      </div>

      <div
        className="absolute left-0 top-0 w-1/2 h-full z-40"
        style={{ cursor: `url("/wheel/hand_left.svg"), w-resize` }}
        onClick={handlePrev}
      ></div>
      <div
        className="absolute right-0 top-0 w-1/2 h-full z-40"
        style={{ cursor: `url("/wheel/hand.svg"), e-resize` }}
        onClick={handleNext}
      ></div>
      <div
        className="absolute right-0 top-0 w-1/2 h-[80%] z-40"
        style={{ cursor: `url("/wheel/hand.svg"), e-resize` }}
        onClick={handleNext}
      ></div>

      <div
        className="w-full h-[600px] sm:h-[800px] md:h-[1000px] lg:h-[1200px] relative overflow-visible z-[70] transition-transform duration-500"
        style={{ transform: `translate(${isMobile ? wheelConfig.rotateOffset : -50}px, ${isMobile ? 0 : wheelConfig.rotateOffset}px)` }}
      >

        <div
          className="relative w-full h-full z-[80] overflow-visible transition-transform duration-1000 ease-in-out"
          style={{ transform: "translateX(-17%)" }}
        >
          <div
            className="relative w-full h-full overflow-visible transition-all duration-1000 ease-out"
            style={{
              transformOrigin: "calc(50% + 0px) calc(50% + 0px)",
              cursor: 'url("/wheel/hand.svg"), auto',
              transform: `scale(${wheelConfig.scale}) rotate(${baseRotation + rotateVal}deg)`,
            }}
          >


            <div
              className="absolute inset-0 w-full h-full bg-white transition-transform duration-1000"
              style={{
                maskImage: 'url("/wheel/DialWheel.svg"), url("/wheel/DialWheel.png")',
                WebkitMaskImage: 'url("/wheel/DialWheel.svg"), url("/wheel/DialWheel.png")',
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center center",
                WebkitMaskPosition: "center center",
              }}
            ></div>


            {["Upskill", "Mentors", "Innovation", "Community"].map((item, idx) => {
              return (
                <div
                  key={item}
                  onClick={() => handleItemClick(idx)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`absolute left-[calc(50%+50px)] top-1/2 text-[12px] sm:text-[24px] md:text-[30px] lg:text-[38px] font-montserrat font-medium transition-all duration-1000 z-[100] group flex items-center gap-1 sm:gap-2 ${activeIndex === idx
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                    }`}
                  style={{
                    cursor: 'url("/wheel/hand.svg"), pointer',
                    transform: `rotate(${-8 + idx * 12}deg) translateX(${wheelConfig.radius}px) translateY(-50%)`,
                    transformOrigin: "left center",
                  }}
                >
                  <span style={{ display: 'inline-block', transform: `rotate(${-(-8 + idx * 12 + baseRotation + rotateVal)}deg)` }}>
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>



        <div className="absolute top-[10%] sm:top-[calc(50%-100px)] md:top-[calc(50%-150px)] lg:top-[calc(50%-180px)] left-[25px] sm:left-[-200px] md:left-[100px] lg:left-[180px] z-60 pointer-events-none">
          <h2 className="text-white/90 text-[25px] pl-10 uppercase sm:text-[20px] md:text-[40px] lg:text-[48px] font-semibold font-montserrat tracking-widest pointer-events-auto">
            Initiatives
          </h2>
        </div>

        <div
          className="absolute top-[28%] sm:top-[42%] w-full h-[50%] z-60 overflow-visible pointer-events-none"
          style={{
            maskImage: "linear-gradient(to right, black 0%, black 50%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to right, black 0%, black 50%, transparent 63%)",
          }}
        >
          <div
            className="flex flex-row  items-center gap-[10px] sm:gap-[20px] md:gap-[25px] lg:gap-[10px] w-full h-full pl-[25px] sm:pl-[300px] md:pl-[250px] lg:pl-[350px] justify-start pt-0 pointer-events-auto transition-transform duration-1000 ease-in-out"
            style={{
              opacity: 1,
              transform: `translateX(${-20 - (activeIndex * slideAmount)}px)`
            }}
          >
            {contentData.map((content, idx) => (
              <div
                key={idx}
                className={`flex flex-col justify-center items-start text-center pl-4 lg:pl-0 px-0 pr-4 max-w-[200px] md:max-w-[350px] lg:max-w-[612px] flex-shrink-0 transition-opacity duration-500 ${activeIndex === idx ? "opacity-100" : "opacity-30"
                  }`}
                style={{ cursor: 'url("/wheel/hand.svg"), pointer' }}
              >
                <h2 className="text-[8px] uppercase sm:text-[10px] md:text-[36px] lg:text-[44px] lg:pl-0 pl-16 font-bold text-white mb-[4px] sm:mb-[50px] md:mb-[60px] lg:mb-[100px] font-montserrat tracking-wide leading-tight whitespace-pre-line">
                  {content.title}
                </h2>
                <p className="text-white/80 text-[6px] pb-[10px] sm:text-[8px] md:text-[2px] lg:text-[28px] lg:pl-0 pl-9 font-medium font-manrope leading-relaxed md:leading-[100%] tracking-normal">
                  {content.desc}
                </p>
              </div>
            ))}
          </div>
        </div>









        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            maskImage:
              "linear-gradient(to right, black 0%, black 50%, transparent 80%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, black 55%, transparent 77%)",
          }}
        >
          <div
            className="flex w-[300%] h-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(${-880 - (activeIndex * 50)}px)` }}
          >
            <div className="relative w-1/3 h-full">
              <img
                alt="Hands Line"
                className="object-contain"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: "0px",
                  color: "transparent",
                }}
                src="/wheel/hands_line.svg"
              />
            </div>
            <div className="relative w-1/3 h-full">
              <img
                alt="Hands Line"
                className="object-contain"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: "0px",
                  color: "transparent",
                }}
                src="/wheel/hands_line.svg"
              />
            </div>
          </div>
        </div>
      </div>

      <section
        className="relative w-full text-white py-10 px-4 sm:px-8 md:px-[100px] lg:pl-[150px] bg-transparent md:bg-black z-50 pointer-events-none"
        style={{ marginTop: "-260px" }}
      >
        <div
          className="absolute inset-0 w-full h-full sync-fade-bg"
          style={{
            backgroundImage: 'url("/upperpart.png")',
            backgroundSize: "100% 100%",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </section>



      {
        isMobile ? (
          <div className="fixed top-[300px] left-1/2 translate-x-1/6 translate-y-1/7 z-[100] pointer-events-none transition-all duration-500">
            <img
              src={contentData[activeIndex].img}
              alt="Active Event"
              className="w-[150px] h-[100px] object-cover rounded-xl shadow-2xl border border-white/10"
            />
          </div>
        ) : (
          hoveredIndex !== null && contentData[hoveredIndex] && (
            <div
              className="fixed z-[9999] pointer-events-none transition-opacity duration-300 ease-out"
              style={{
                left: mousePosition.x + 20,
                top: mousePosition.y + 20,
                width: '300px',
                height: '200px',
                opacity: 1,
                transform: 'translate(0, 0)'
              }}
            >
              <img
                src={contentData[hoveredIndex].img}
                alt="Hover Preview"
                className="w-full h-full object-cover rounded-xl shadow-2xl border-2 border-white/20"
              />
            </div>
          )
        )
      }
    </section >
  );
};

export default Offering;