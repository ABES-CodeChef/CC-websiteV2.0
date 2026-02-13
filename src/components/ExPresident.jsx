import React, { useState, useEffect, useRef } from "react";
import { Linkedin, Award, Code, Users, TrendingUp } from "lucide-react";

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          
          const startTime = Date.now();
          const startValue = 0;
          const endValue = parseInt(end);

          const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(endValue);
            }
          };

          animate();
          
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [end, duration]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
};

const ExPresident = () => {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);
  const [row1Scale, setRow1Scale] = useState(1);
  const [row2Scale, setRow2Scale] = useState(1);
  const [row3Scale, setRow3Scale] = useState(1);

  useEffect(() => {
    const calculateScale = (element) => {
      if (!element) return 1;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementMiddle = rect.top + rect.height / 2;
      const viewportMiddle = windowHeight / 2;

      const distance = Math.abs(elementMiddle - viewportMiddle);
      const maxDistance = windowHeight;

      const scale = Math.max(0.7, 1 - (distance / maxDistance) * 0.3);
      return scale;
    };

    const handleScroll = () => {
      setRow1Scale(calculateScale(row1Ref.current));
      setRow2Scale(calculateScale(row2Ref.current));
      setRow3Scale(calculateScale(row3Ref.current));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const presidents = [
    {
      id: 1,
      name: "Tanishq Srivastava",
      skill: "Full Stack Flutter Developer",
      role: "President 2020-2021",
      image: "/tanishq-bhaiya.webp",
      profileImg: "/tanishq-bhaiya.webp",
      username: "@tanishq ",
      linkedin: "https://www.linkedin.com/in/tannatsri/",
    },
    {
      id: 2,
      name: "Tanveer Raza",
      skill: "Rust, Linux Systems Programming",
      role: "President 2021-2022",
      image: "/tanveer-bhaiya.jpg",
      profileImg: "/tanveer-bhaiya.jpg",
      username: "@tanveer",
      linkedin: "https://www.linkedin.com/in/atamakahere/",
    },
    {
      id: 3,
      name: "Bhumika Arora",
      skill: "SDE , Amazon",
      role: "President 2022-2023",
      image: "/bhumika-didi.webp",
      profileImg: "/bhumika-didi.webp",
      username: "@bhumika",
      linkedin: "https://www.linkedin.com/in/thebhumikaarora/",
    },
    {
      id: 4,
      name: "Abhinav Jha",
      skill: "UI/UX Designer",
      role: "President 2023-2024",
      image: "/abhinav-bhaiya.webp",
      profileImg: "/abhinav-bhaiya.webp",
      username: "@Abhinav",
      linkedin: "https://www.linkedin.com/in/abhijha301/",
    },
    {
      id: 5,
      name: "Sai Aryan Goswami",
      skill: "Full Stack Developer",
      role: "President 2024-2025",
      image: "/sai-bhaiya.jpg",
      profileImg: "/sai-bhaiya.jpg",
      username: "saiaryan",
      linkedin: "https://www.linkedin.com/in/saiaryangoswami",
    },
  ];

  const stats = [
    { icon: Users, value: 1500, suffix: "+", label: "Community Members", duration: 2500 },
    { icon: Code, value: 50, suffix: "+", label: "Team Members", duration: 2000 },
    { icon: Award, value: 15, suffix: "+", label: "Events", duration: 2000 },
    { icon: TrendingUp, value: 5, suffix: "+", label: "Years Old Community", duration: 1500 },
  ];

  const PresidentCard = ({ president }) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -20;
      const rotateY = ((x - centerX) / centerX) * 20;

      setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0 });
      setIsHovered(false);
    };

    return (
      <div
        className="relative w-full h-72 perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative w-full h-full transition-all duration-500 ease-out"
          style={{
            transform: `perspective(1500px) rotateX(${rotation.x}deg) rotateY(${
              rotation.y
            }deg) scale3d(${isHovered ? 1.08 : 1}, ${isHovered ? 1.08 : 1}, ${
              isHovered ? 1.08 : 1
            })`,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl group">
            <img
              src={president.image}
              alt={president.name}
              className="w-full h-full object-cover"
            />

            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 z-20 transform translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <h3 className="text-white text-xl md:text-2xl font-bold mb-1 md:mb-2">
                {president.name}
              </h3>
              <p className="text-blue-300 text-xs md:text-sm font-medium mb-1">
                {president.skill}
              </p>
              <p className="text-gray-200 text-xs md:text-sm">
                {president.role}
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 bg-white/20 backdrop-blur-md z-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <img
                    src={president.profileImg}
                    alt={president.name}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white shadow-lg object-cover"
                  />
                  <div>
                    <p className="text-white font-semibold text-xs md:text-sm">
                      {president.username}
                    </p>
                    <p className="text-gray-200 text-[10px] md:text-xs">
                      Online
                    </p>
                  </div>
                </div>

                <a
                  href={president.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 md:w-10 md:h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-500 hover:shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
          <div className="lg:sticky lg:top-24 space-y-6 md:space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 md:mb-7 leading-[1.1]">
                Meet Our
                <br /> Kitchen Crew
              </h1>

              <p className="text-sm md:text-base text-gray-600 font-light mb-4 md:mb-6 leading-relaxed">
                We are a Team of passionate coders dedicated to advancing
                programming skills and creating opportunities for growth. With a
                mix of diverse talents, we collaborate to organize events,
                challenges, and workshops for our coding community.
              </p>

              <p className="text-sm md:text-base text-gray-600 font-light mb-6 md:mb-8 leading-relaxed">
                Together, we're cooking up a collaborative coding culture that
                fuels learning, pushes boundaries, and serves up a hearty helping
                of innovation—with a side of creativity.
              </p>

              <a
                href="/team"
                className="group relative inline-block overflow-hidden rounded-xl
               px-6 md:px-8 py-3 md:py-3.5
               font-semibold text-xs md:text-sm uppercase tracking-wide
               cursor-pointer
               transition-all duration-500 ease-out
                hover:shadow-xl mb-6 md:mb-8"
              >
                <span className="absolute inset-0 bg-yellow-500 transition-all duration-500 ease-out" />
                <span
                  className="absolute inset-0 bg-black
                 translate-y-full group-hover:translate-y-0
                 transition-transform duration-500 ease-out"
                />
                <span className="relative z-10 text-white">
                  Explore Our Kitchen
                </span>
              </a>

              <p className="text-2xl md:text-3xl text-gray-900 leading-snug">
                <span className="font-light text-black/80">
                  Our Secret ingredient?
                </span>
                <br />
                <span className="font-bold text-black"> Perfect code.</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-gray-200">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div className="flex flex-col gap-2 mb-2">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                      <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900 tabular-nums">
                      <CountUp end={stat.value} duration={stat.duration} suffix={stat.suffix} />
                    </p>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div
              ref={row1Ref}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 transition-all duration-700 ease-out"
              style={{
                transform: `scale(${row1Scale})`,
                opacity: row1Scale,
              }}
            >
              <PresidentCard president={presidents[0]} />
              <PresidentCard president={presidents[1]} />
            </div>

            <div
              ref={row2Ref}
              className="max-w-full md:max-w-sm mx-auto mb-6 transition-all duration-700 ease-out"
              style={{
                transform: `scale(${row2Scale})`,
                opacity: row2Scale,
              }}
            >
              <PresidentCard president={presidents[2]} />
            </div>

            <div
              ref={row3Ref}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 ease-out"
              style={{
                transform: `scale(${row3Scale})`,
                opacity: row3Scale,
              }}
            >
              <PresidentCard president={presidents[3]} />
              <PresidentCard president={presidents[4]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExPresident;