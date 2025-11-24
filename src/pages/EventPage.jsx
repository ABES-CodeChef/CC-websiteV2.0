import Footer from "../components/Footer";
import useLenis from "../hooks/useLenis";
import { BackgroundOverlayCard } from "../components/BackgroundOverlayCard";

const events = [
  {
    title: "CodeClash 2024",
    href: "https://www.codechef.com/",
    imageUrl:
      "https://codechefabesec.netlify.app/img/coc/1.webp",
    hoverImageUrl:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWJjb3NqY21sYjY2aG1zZ3c3aGZ6Z3Z1c3NldWJrbjZ2eW54c3JqZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13HgwGsXF0aiGY/giphy.gif",
  },
  {
    title: "Rust - Ed",
    href: "#",
    imageUrl:
      "https://codechefabesec.netlify.app/img/works/4/Rusted.webp",
    hoverImageUrl:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWJjb3NqY21sYjY2aG1zZ3c3aGZ6Z3Z1c3NldWJrbjZ2eW54c3JqZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13HgwGsXF0aiGY/giphy.gif",
  },
  {
    title: "Once Upon A Crime",
    href: "#",
    imageUrl:
      "https://codechefabesec.netlify.app/img/converted/crime.webp",
    hoverImageUrl:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWJjb3NqY21sYjY2aG1zZ3c3aGZ6Z3Z1c3NldWJrbjZ2eW54c3JqZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13HgwGsXF0aiGY/giphy.gif",
  },
   {
    title: "T-Error 3.0",
    href: "#",
    imageUrl:
      "https://codechefabesec.netlify.app/img/t_error/1.webp",
    hoverImageUrl:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWJjb3NqY21sYjY2aG1zZ3c3aGZ6Z3Z1c3NldWJrbjZ2eW54c3JqZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13HgwGsXF0aiGY/giphy.gif",
  },
   {
    title: "Byond Code",
    href: "#",
    imageUrl:
      "https://codechefabesec.netlify.app/img/beyond_code/1.webp",
    hoverImageUrl:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWJjb3NqY21sYjY2aG1zZ3c3aGZ6Z3Z1c3NldWJrbjZ2eW54c3JqZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13HgwGsXF0aiGY/giphy.gif",
  },
   {
    title: "Head Node",
    href: "#",
    imageUrl:
      "https://codechefabesec.netlify.app/img/converted/headnode.webp",
    hoverImageUrl:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWJjb3NqY21sYjY2aG1zZ3c3aGZ6Z3Z1c3NldWJrbjZ2eW54c3JqZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13HgwGsXF0aiGY/giphy.gif",
  },
];



export default function EventsPage() {
  useLenis();

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white text-black">
      <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-10 flex flex-col items-center">
        <h1 className="text-8xl font-bold text-center mb-12">
          Our <span className="text-orange-600">Events</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 place-items-center">
          {events.map((event, index) => (
            <a key={index} href={event.href} target="_blank" rel="noopener noreferrer" className="w-full">
              <BackgroundOverlayCard {...event} />
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}