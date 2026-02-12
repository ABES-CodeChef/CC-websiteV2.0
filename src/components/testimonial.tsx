import { TestimonialsCard } from "./ui/testimonials-card"

const testimonials = [
{
  id: 1,
  title: "Sarah Wilson",
  description: "Incredible product! It exceeded all my expectations.",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
},
{
  id: 2,
  title: "David Chen",
  description: "The best investment I've made this year.",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
},
{
  id: 3,
  title: "Emma Rodriguez",
  description: "Outstanding service and amazing results!",
  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
},
];

export default function AnimatedTestimonialsDemo() {
return (
  <div className="w-full py-20 px-4 bg-black">
    <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
      Served Hot: Words from Our Bawarchis
    </h2>
    <div className="flex justify-center">
      <TestimonialsCard items={testimonials} autoPlay={true} width={600} />
    </div>
  </div>
);
}