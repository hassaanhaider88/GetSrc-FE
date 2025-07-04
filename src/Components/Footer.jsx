import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { FaFonticonsFi } from "react-icons/fa";
import { BiLogoNetlify } from "react-icons/bi";
import { FaGithub } from "react-icons/fa6";
import { toast } from "react-toastify";
import axios from "axios";

const FooterCom = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const [IsEmailSend, setIsEmailSend] = useState(false);
  const [EmailVal, setEmailVal] = useState("");
  const handleIconClick = (link) => {
    window.open(link);
  };

  const handleEmail = async () => {
    if (!EmailVal) return toast.error("Please fill in your email.");
    if (!EmailVal.includes("@")) return alert("Valid email enter karein");
    setIsEmailSend(true);
      const res = await fetch(
        `http://localhost:3000/api/save-email?email=${EmailVal}`
      );

      const data = await res.json(); // Optional: check response
      console.log("Server response:", data);

      if (data.success) {
        toast.success("Thanks for your trust!");
      } else {
        toast.error(data.error || "Something went wrong");
        setIsEmailSend(false)
      }
    }
  

  useEffect(() => {
    // GSAP animations for logo
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 0.3 }
      );
    }

    // GSAP hover animations for social icons
    const socialIcons = document.querySelectorAll(".social-icon");
    socialIcons.forEach((icon) => {
      icon.addEventListener("mouseenter", () => {
        gsap.to(icon, { scale: 1.1, duration: 0.2, ease: "power2.out" });
      });
      icon.addEventListener("mouseleave", () => {
        gsap.to(icon, { scale: 1, duration: 0.2, ease: "power2.out" });
      });
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className=" bg-gray-200 flex items-center justify-center p-8">
      <motion.div
        ref={footerRef}
        className="bg-black rounded-2xl p-8 w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-12">
          {/* Left Section - Hire Different */}
          <motion.div className="mb-8 lg:mb-0" variants={itemVariants}>
            <h3 className="text-white text-lg font-medium mb-4">
              Hassaan Haider ™
            </h3>
            {IsEmailSend ? (
              <div className="text-lg mb-5 font-semibold text-white py-2">
                Submit Successfully
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                  type="email"
                  placeholder="email@gmail.com"
                  value={EmailVal}
                  onChange={(e) => setEmailVal(e.target.value)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500 transition-colors duration-200 text-sm"
                />
                <motion.button
                  disabled={IsEmailSend}
                  onClick={handleEmail}
                  className="bg-[#81E3E7] text-black px-6 py-2 rounded-md font-medium text-sm hover:bg-[#5cdee2] hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join for free
                </motion.button>
              </div>
            )}

            {/* Social Icons */}
            <div className="flex text-white gap-3">
              <motion.div
                className="social-icon w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                variants={itemVariants}
              >
                <div
                  onClick={() =>
                    handleIconClick(
                      "https://codepen.io/Hassaan-Haider-the-sans"
                    )
                  }
                  className="btn"
                >
                  <i className="fa-brands fa-codepen"></i>
                </div>
              </motion.div>
              <motion.div
                className="social-icon w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                variants={itemVariants}
              >
                <div
                  onClick={() => handleIconClick("https://wa.me/+93437117831")}
                  className="btn"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </div>
              </motion.div>
              <motion.div
                className="social-icon w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                variants={itemVariants}
              >
                <div
                  onClick={() =>
                    handleIconClick(
                      "https://www.linkedin.com/in/hassaan-haider-627272294"
                    )
                  }
                  className="btn"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </div>
              </motion.div>
              <motion.div
                className="social-icon w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                variants={itemVariants}
              >
                <div
                  onClick={() =>
                    handleIconClick("https://www.facebook.com/CodeWeb88")
                  }
                  className="btn"
                >
                  <i className="fa-brands fa-facebook"></i>
                </div>
              </motion.div>
              <motion.div
                className="social-icon w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                variants={itemVariants}
              >
                <div
                  onClick={() =>
                    handleIconClick("https://github.com/hassaanhaider88")
                  }
                  className="btn"
                >
                  <i className="fa-brands fa-github"></i>
                </div>
              </motion.div>
              <motion.div
                className="social-icon w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                variants={itemVariants}
              >
                <div
                  onClick={() =>
                    handleIconClick(
                      "https://www.instagram.com/hassaanhaiderhmk/"
                    )
                  }
                  className="btn"
                >
                  <i className="fa-brands fa-instagram"></i>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Section - Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-12 lg:gap-16">
            {/* Find Work Column */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-medium mb-4">Find Work</h4>
              <ul className="space-y-3">
                <li>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    whileHover={{ x: 2 }}
                  >
                    Explore Jobs
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    whileHover={{ x: 2 }}
                  >
                    Discover Companies
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    whileHover={{ x: 2 }}
                  >
                    Browse Collections
                  </motion.a>
                </li>
              </ul>
            </motion.div>

            {/* Find People Column */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-medium mb-4">Find People</h4>
              <ul className="space-y-3">
                <li>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    whileHover={{ x: 2 }}
                  >
                    Learn More
                  </motion.a>
                </li>
                <li>
                  <Link
                    to={"/profile"}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    whileHover={{ x: 2 }}
                  >
                    Sign up
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Company Column */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to={"/about-us"}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    whileHover={{ x: 2 }}
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    whileHover={{ x: 2 }}
                  >
                    Careers
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="https://wa.me/+923437117831"
                    target="blank"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    whileHover={{ x: 2 }}
                  >
                    Contact
                  </motion.a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section - Large Logo */}
        <div ref={logoRef} className="mt-8">
          <h1 className="text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-none">
            Get Src
          </h1>
        </div>
      </motion.div>
    </div>
  );
};

export default FooterCom;
