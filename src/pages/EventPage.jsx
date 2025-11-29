import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import useLenis from "../hooks/useLenis";
import { BackgroundOverlayCard } from "../components/BackgroundOverlayCard";
import { GridScan } from "../components/GridScan";
import { FloatingNav } from "../components/FloatingNavbar";
import {
  IconHome,
  IconCalendar,
  IconUsers,
  IconMail,
  IconTrophy,
} from "@tabler/icons-react";

const events = [
  {
    title: "CodeClash 2024",
    href: "/events/codeclash-2024",
    imageUrl: "https://codechefabesec.netlify.app/img/coc/1.webp",
    hoverImageUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWJjb3NqY21sYjY2aG1zZ3c3aGZ6Z3Z1c3NldWJrbjZ2eW54c3JqZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13HgwGsXF0aiGY/giphy.gif",
  },
  {
    title: "Rust - Ed",
    href: "/events/rust-ed",
    imageUrl: "https://codechefabesec.netlify.app/img/works/4/Rusted.webp",
    hoverImageUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWJjb3NqY21sYjY2aG1zZ3c3aGZ6Z3Z1c3NldWJrbjZ2eW54c3JqZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13HgwGsXF0aiGY/giphy.gif",
  },
  {
    title: "Once Upon A Crime",
    href: "/events/once-upon-a-crime",
    imageUrl: "https://codechefabesec.netlify.app/img/converted/crime.webp",
    hoverImageUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWJjb3NqY21sYjY2aG1zZ3c3aGZ6Z3Z1c3NldWJrbjZ2eW54c3JqZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13HgwGsXF0aiGY/giphy.gif",
  },
  {
    title: "T-Error 3.0",
    href: "/events/t-error-3",
    imageUrl: "https://codechefabesec.netlify.app/img/t_error/1.webp",
    hoverImageUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWJjb3NqY21sYjY2aG1zZ3c3aGZ6Z3Z1c3NldWJrbjZ2eW54c3JqZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13HgwGsXF0aiGY/giphy.gif",
  },
  {
    title: "Byond Code",
    href: "/events/byond-code",
    imageUrl: "https://codechefabesec.netlify.app/img/beyond_code/1.webp",
    hoverImageUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWJjb3NqY21sYjY2aG1zZ3c3aGZ6Z3Z1c3NldWJrbjZ2eW54c3JqZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13HgwGsXF0aiGY/giphy.gif",
  },
  {
    title: "Head Node",
    href: "/events/head-node",
    imageUrl: "https://codechefabesec.netlify.app/img/converted/headnode.webp",
    hoverImageUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWJjb3NqY21sYjY2aG1zZ3c3aGZ6Z3Z1c3NldWJrbjZ2eW54c3JqZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13HgwGsXF0aiGY/giphy.gif",
  },
];

export default function EventsPage() {
  useLenis();
  const navigate = useNavigate();

  const scrollToSection = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/",
      onClick: () => navigate("/"),
    },
    {
      title: "Events",
      icon: <IconCalendar className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/events",
      onClick: () => navigate("/events"),
    },
    {
      title: "Team",
      icon: <IconUsers className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/team",
      onClick: () => navigate("/team"),
    },
    {
      title: "Achievements",
      icon: <IconTrophy className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#achievements",
      onClick: () => scrollToSection("#achievements"),
    },
    {
      title: "Contact",
      icon: <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/contact",
      onClick: () => navigate("/contact"),
    },
  ];

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-black text-white relative">
      <FloatingNav navItems={navLinks} />

      <div className="fixed inset-0 z-0">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#2a2a3a"
          gridScale={0.09}
          scanColor="#FFA500"
          scanOpacity={0.2}
          enablePost
          bloomIntensity={0.3}
          chromaticAberration={0.005}
          noiseIntensity={0.045}
          scanGlow={1}
        />
      </div>
      <div className="relative z-10 min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-10 flex flex-col items-center">
        <h1 className="text-8xl font-bold text-center mb-12">
          Our <span className="text-orange-500">Events</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 place-items-center">
          {events.map((event, index) => (
            <a
              key={index}
              href={event.href}
              rel="noopener noreferrer"
              className="w-full"
            >
              <BackgroundOverlayCard
                title={event.title}
                imageUrl={event.imageUrl}
                hoverImageUrl={event.hoverImageUrl}
              />
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}