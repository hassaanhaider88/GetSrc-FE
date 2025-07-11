import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FooterCom from "../Components/Footer";
import { Helmet } from "react-helmet";
import FeaturesSection from "../Components/Feauter";

const AboutUs = () => {
 
  return (
    <>
      <Helmet>
        <title>About Us | GetURI</title>
        <meta
          name="description"
          content="Learn about GetURI - the ultimate tool for developers to upload, host, and share images and videos instantly via CDN."
        />
      </Helmet>

      <FeaturesSection />
      <FooterCom />
    </>
  );
};

export default AboutUs;
