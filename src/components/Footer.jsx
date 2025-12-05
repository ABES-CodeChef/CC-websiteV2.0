import { FaInstagram, FaLinkedin, FaDiscord } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-scroll";

function Footer() {
  return (
    <footer
      className="bg-black text-white py-8 px-6 rounded-t-3xl"
      id="contactUs"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 p-6">
        <div className="col-span-1 md:col-span-2">
          <h3 className="font-audiowide text-4xl mb-4">
            CodeChef ABESEC Chapter
          </h3>
          <p className="text-gray-400 mb-4">
            Join us for an exciting journey of coding, innovation, and
            creativity. Where innovation meets code and dreams become reality.
          </p>
          <button className="group relative px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-semibold rounded-full overflow-visible transition-all duration-500 ease-out hover:pr-8 hover:pl-6 hover:shadow-[0_8px_40px_-12px_rgba(255,165,0,0.4)] hover:translate-y-[-2px]">
            <span className="relative z-10 flex items-center gap-2 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
              Browse Events
              <FiArrowUpRight
                className="inline-block transition-all duration-500 ease-out group-hover:rotate-45 group-hover:translate-x-1"
                size={18}
                strokeWidth={2.5}
              />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out rounded-full" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ease-out bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.4),rgba(255,255,255,0))] rounded-full" />
          </button>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h3 className="font-audiowide text-xl mb-4">QUICK LINKS</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="about"
                smooth={true}
                duration={500}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="timeline"
                smooth={true}
                duration={500}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                Team
              </Link>
            </li>
            <li>
              <Link
                to="tracks"
                smooth={true}
                duration={500}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                Achievements
              </Link>
            </li>
            <li>
              <Link
                to="sponsors"
                smooth={true}
                duration={500}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                contact
              </Link>
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
          <h3 className="font-audiowide text-xl mb-4">CONNECT WITH US</h3>
          <div className="text-gray-400 mb-4">
            <a
              href="mailto:abesec.codechef@gmail.com"
              className="hover:text-white"
            >
              abesec.codechef@gmail.com
            </a>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-pink-500">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-500">
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
            Made with <span className="text-red-500">❤</span> by Awesome People
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
