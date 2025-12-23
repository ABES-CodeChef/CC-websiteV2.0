import { FaInstagram, FaLinkedin, FaDiscord } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    const currentPath = location.pathname;
    
    if (currentPath === path) return true;
    
    if (path !== '/' && currentPath.startsWith(path)) return true;
    
    return false;
  };

  return (
    <>
    <footer
      className="bg-black text-white py-6 md:py-8 px-4 md:px-6 z-10 relative"
      id="contactUs"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 p-4 md:p-6">
        <div className="col-span-1 md:col-span-2">
          <h3 className="font-sora text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold mb-3 md:mb-4 leading-tight">
            CodeChef ABESEC Chapter
          </h3>
          <p className="text-gray-400 text-sm md:text-base mb-3 md:mb-4">
            Join us for an exciting journey of coding, innovation, and
            creativity. Where innovation meets code and dreams become reality.
          </p>
          <button
            onClick={() => navigate("/events")}
            className="group relative border-none px-4 md:px-5 py-2.5 md:py-3 rounded-xl font-inter text-xs md:text-sm font-semibold overflow-hidden
             cursor-pointer transition-all duration-500 ease-out
             hover:-translate-y-0.5 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.4)]"
          >
            <span className="absolute inset-0 bg-yellow-600 transition-all duration-500 ease-out" />

            <span
              className="absolute inset-0 bg-black
               translate-y-full group-hover:translate-y-0
               transition-transform duration-500 ease-out"
            />
            <span className="relative z-10 flex items-center gap-2 text-white">
              Browse Events
              <FiArrowUpRight
                size={16}
                strokeWidth={2.5}
                className="transition-all duration-500 group-hover:rotate-45 group-hover:translate-x-1 md:w-[18px] md:h-[18px]"
              />
            </span>
          </button>
        </div>

        <div className="col-span-1">
          <h3 className="font-inter text-xs md:text-sm font-semibold mb-3 md:mb-4">
            QUICK LINKS
          </h3>
          <ul className="flex flex-row md:flex-col flex-wrap gap-x-4 gap-y-2 md:space-y-2 md:space-x-0">
            <li>
              <a
                href="/"
                className={`cursor-pointer text-sm md:text-base transition-colors ${
                  isActive("/")
                    ? "text-orange-500 font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/events"
                className={`cursor-pointer text-sm md:text-base transition-colors ${
                  isActive("/events")
                    ? "text-orange-500 font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="/team"
                className={`cursor-pointer text-sm md:text-base transition-colors ${
                  isActive("/team")
                    ? "text-orange-500 font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Team
              </a>
            </li>
            <li>
              <a
                href="/achievements"
                className={`cursor-pointer text-sm md:text-base transition-colors ${
                  isActive("/achievements")
                    ? "text-orange-500 font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Achievements
              </a>
            </li>
            <li>
              <ScrollLink
                to="contactUs"
                smooth={true}
                duration={500}
                className="text-gray-400 hover:text-white cursor-pointer text-sm md:text-base transition-colors"
              >
                Contact
              </ScrollLink>
            </li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="font-inter text-xs md:text-sm font-semibold mb-3 md:mb-4">
            CONNECT WITH US
          </h3>
          <div className="text-gray-400 mb-3 md:mb-4 text-sm md:text-base">
            <a
              href="mailto:abesec.codechef@gmail.com"
              className="hover:text-white break-all"
            >
              abesec.codechef@gmail.com
            </a>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/abesec.codechef/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition-colors"
            >
              <FaInstagram size={20} className="md:w-6 md:h-6" />
            </a>
            <a
              href="https://www.linkedin.com/company/abesec-codechef/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              <FaLinkedin size={20} className="md:w-6 md:h-6" />
            </a>
            <a
              href="https://discord.gg/6XG6jajX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-500 transition-colors"
            >
              <FaDiscord size={20} className="md:w-6 md:h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-3 pt-2 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs md:text-sm">
          <p className="text-gray-400">© 2025 Codechef. All rights reserved.</p>
          <p className="text-gray-400">
            Made with <span className="text-red-500">❤</span> by Bawarchi
          </p>
        </div>
      </div>
    </footer>
    </>
  );
}

export default Footer;