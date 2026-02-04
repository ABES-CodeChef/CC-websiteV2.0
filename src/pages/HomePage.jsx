// import ElixirCommunity from "../components/ElixerCommunity";
import ExPresident from "../components/ExPresident";
// import Footer from "../components/Footer";
import Landing from "../components/Landing";
import Offering from "../components/Offering";
import About from "../components/about";
import EventsGalary from "../components/eventsGalary";
import AnimatedTestimonialsDemo from "../components/testimonial";
import useLenis from "../hooks/useLenis";



export default function HomePage() {
   useLenis();
  return (
    <div className="w-full  overflow-x-hidden">
      <Landing />
      <About />
      <Offering/>
      <ExPresident />
      <AnimatedTestimonialsDemo />
      <EventsGalary />
    
      {/* <ElixirCommunity /> */}
      {/* <Footer /> */}
    </div>
  );
}