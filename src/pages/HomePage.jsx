import ExPresident from "../components/ExPresident";
import Landing from "../components/Landing";
import Offering from "../components/Offering";
import About from "../components/about";
import useLenis from "../hooks/useLenis";


export default function HomePage() {
   useLenis();
  return (
    <div className="w-full  overflow-x-hidden">
      <Landing />
      <About />
      <Offering/>
      <ExPresident />
      
    </div>
  );
}