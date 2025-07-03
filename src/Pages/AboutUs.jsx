import { useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us | GetSrc</title>
        <meta
          name="description"
          content="Learn about GetSrc - the ultimate tool for developers to upload, host, and share images and videos instantly via CDN."
        />
      </Helmet>

      <section className="min-h-screen w-full py-16 px-6 sm:px-10 bg-gradient-to-br from-[#0BA9D1] via-[#00c6b3] to-[#71D42C] flex flex-col items-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center tracking-tight"
        >
          Welcome to <span className="text-white/90">GetSrc</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 max-w-2xl text-center text-lg md:text-xl text-white/90 leading-relaxed"
        >
          GetSrc is a developer-first platform to upload, host and share media.
          Upload files and receive CDN-ready links instantly. No sign-up needed
          to copy URI.
        </motion.p>

        <div className="min-h-[40vh] w-full flex justify-between items-center">
          <div>
            <img
              src="../../GetSrc_Logo.png"
              alt="Get Src Logo"
              width={"100%"}
              height={"100%"}
            />
          </div>
          <div className="text-left flex flex-col  justify-start w-1/2">
            <h1 className="text-7xl font-semibold">About Us</h1>
            <p className="text-lg text-[#7AF417] font-[500]" >Wonder To Knows About Us</p>
            <p className="text-left text-sm font-semibold pr-5">
              GetSrc is a powerful media hosting platform tailored for
              developers. It lets you upload images and videos with a single
              click—no sign-up needed. Instantly receive shareable CDN-powered
              URLs for fast and reliable delivery. Simplify your workflow with a
              tool built for speed, efficiency, and ease of use.
            </p>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-semibold">Start Uploading Today</h3>
          
          <Link
            to="/upload-file"
            className="inline-block mt-3 bg-white text-[#0BA9D1] hover:text-white hover:bg-[#0BA9D1] hover:shadow-xl px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300"
          >
            Upload Now
          </Link>
        </motion.div>
      </section>
    </>
  );
};

export default AboutUs;
