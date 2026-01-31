import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BackgroundOverlayCard } from "../components/BackgroundOverlayCard";
import Particles from "../components/particles";
import { FloatingNav } from "../components/FloatingNavbar";
import {
  IconHome,
  IconCalendar,
  IconUsers,
  IconMail,
  IconTrophy,
  IconLogout,
  IconDashboard,
} from "@tabler/icons-react";

const events = [
  {
    title: "Clash Of Coders 4.0",
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
    title: "Beyond Code",
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
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
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
      href: "/achievements",
      onClick: () => navigate("/achievements"),
    },
    {
      title: "Contact",
      icon: <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/contact",
      onClick: () => navigate("/contact"),
    },
  ];

  // Add admin dashboard and logout button if user is logged in
  if (user) {
    if (user.role === 'admin') {
      navLinks.push({
        title: "Admin Dashboard",
        icon: <IconDashboard className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
        href: "/admin",
        onClick: () => navigate("/admin"),
      });
    }
    
    navLinks.push({
      title: "Logout",
      icon: <IconLogout className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
      onClick: handleLogout,
    });
  }

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-black text-white relative">
      <FloatingNav navItems={navLinks} />

      <div className="fixed inset-0 z-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="relative z-10 min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-10 flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl font-bold text-center mb-12">
          Our <span className="text-orange-500">Events</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 place-items-center">
          {events.map((event, index) => (
            <a
              key={index}
              href={event.href}
              rel="noopener noreferrer"
              className="w-full max-w-sm md:max-w-xs mx-auto"
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
    </div>
  );
}