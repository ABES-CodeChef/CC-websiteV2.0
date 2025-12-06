import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import logo from "/logo.png";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Email Validation
  const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  // Form Submit
  const handleSubmit = () => {
    const { name, email, subject, message } = formData;

    // Validation
    if (!name || !email || !subject || !message) {
      toast.error("Please fill all fields!", { position: "top-center" });
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email!", { position: "top-center" });
      return;
    }

    // Simulate sending message
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent successfully!", { position: "top-center" });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  const scrollToContact = () => {
    document.getElementById("contact-section").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden font-[Poppins]">
      <ToastContainer />

      <div className="fixed top-4 left-4 z-50">
        <img
          src={logo}
          alt="Logo"
          className="w-20 sm:w-16 md:w-20 lg:w-24 xl:w-28 object-contain"
        />
      </div>

      <div className="h-screen flex flex-col items-center justify-center relative px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <h1 className="text-7xl md:text-9xl font-medium mb-8 text-center tracking-tight font-[Poppins]">
          Get In Touch
        </h1>

        <button
          onClick={scrollToContact}
          className="group relative mt-48 px-10 py-4 cursor-pointer text-black font-light text-lg transition-all duration-300 transform hover:scale-105 font-[Inter]"
        >
          Send Message
        </button>

        <div
          className="absolute bottom-14 animate-bounce cursor-pointer"
          onClick={scrollToContact}
        >
          <div className="w-8 h-14 border-3 border-black rounded-full flex justify-center pt-2 shadow-md">
            <div className="w-1 h-3 bg-black rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <div
        id="contact-section"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-white font-[Inter]"
      >
        <h2 className="text-5xl md:text-6xl mb-12 text-black text-center tracking-tight">
          <span className="font-[Poppins] font-bold">Let&apos;s</span>{" "}
          <span className="font-[Poppins] font-extralight">Talk</span>
        </h2>

        <div className="w-full max-w-4xl bg-gray-50 rounded-3xl p-10 md:p-14">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-6 py-4 bg-white border-2 border-gray-300 rounded-xl 
                focus:outline-none focus:border-black transition-all duration-300 text-black font-medium"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-6 py-4 bg-white border-2 border-gray-300 rounded-xl 
                focus:outline-none focus:border-black transition-all duration-300 text-black font-medium"
              />
            </div>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full px-6 py-4 bg-white border-2 border-gray-300 rounded-xl 
              focus:outline-none focus:border-black transition-all duration-300 text-black font-medium"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows="6"
              className="w-full px-6 py-4 bg-white border-2 border-gray-300 rounded-xl 
              focus:outline-none focus:border-black transition-all duration-300 text-black resize-none font-medium"
            ></textarea>

            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-52 group relative px-8 py-4 rounded-xl font-bold text-lg overflow-hidden 
              transition-all duration-500 cursor-pointer font-[Montserrat]"
              >
                <span className="absolute inset-0 bg-yellow-400 transition-all duration-500 ease-out"></span>
                <span className="absolute inset-0 bg-black transition-all duration-500 ease-out group-hover:translate-y-0 translate-y-full"></span>

                <span className="relative z-10 text-white flex items-center gap-2 justify-center">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Send Message"
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
