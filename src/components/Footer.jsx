import { FaInstagram, FaLinkedin, FaDiscord } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer
      className="bg-black text-white py-8 px-6 rounded-t-3xl z-10 relative"
      id="contactUs"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 p-6">
        <div className="col-span-1 md:col-span-2">
          <h3 className="font-sora text-[64px] font-bold mb-4 leading-tight">
            CodeChef ABESEC Chapter
          </h3>
          <p className="text-gray-400 mb-4">
            Join us for an exciting journey of coding, innovation, and
            creativity. Where innovation meets code and dreams become reality.
          </p>
          <button
            onClick={() => navigate("/events")}
            className="group relative border-none px-5 py-3 rounded-xl font-inter text-sm font-semibold overflow-hidden
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
                size={18}
                strokeWidth={2.5}
                className="transition-all duration-500 group-hover:rotate-45 group-hover:translate-x-1"
              />
            </span>
          </button>
        </div>
        <div className="col-span-1">
          <h3 className="font-inter text-sm font-semibold mb-4">QUICK LINKS</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/events"
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="/team"
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                Team
              </a>
            </li>
            <li>
              {/* Assuming you have or will have an achievements page/section */}
              <a
                href="/#achievements"
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                Achievements
              </a>
            </li>
            <li>
              <ScrollLink
                to="contactUs"
                smooth={true}
                duration={500}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                Contact
              </ScrollLink>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        {/* <div className="col-span-1">
          <h3 className="font-audiowide text-xl mb-4">CONTACT</h3>
          <ul className="space-y-2">
            <li className="text-gray-400">
              <a
                href="mailto:business.codegeeks@gmail.com"
                className="hover:text-white"
              >
                
              </a>
            </li>
            <li className="text-gray-400">+91 8279437447</li>
            <li className="text-gray-400">Delhi, India</li>
          </ul>
        </div> */}

        {/* Connect With Us */}
        <div className="col-span-1">
          <h3 className="font-inter text-sm font-semibold mb-4">CONNECT WITH US</h3>
          <div className="text-gray-400 mb-4">
            <a
              href="mailto:abesec.codechef@gmail.com"
              className="hover:text-white"
            >
              abesec.codechef@gmail.com
            </a>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/abesec.codechef/"
              className="text-gray-400 hover:text-pink-500"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.linkedin.com/company/abesec-codechef/posts/?feedView=all"
              className="text-gray-400 hover:text-blue-500"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://discord.gg/6XG6jajX"
              className="text-gray-400 hover:text-green-500"
            >
              <FaDiscord size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-3 pt-2 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2025 Codechef. All rights reserved.</p>
          <p className="text-gray-400">
            Made with <span className="text-red-500">❤</span> by Bawarchi's
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
