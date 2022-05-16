import React from "react";
import Header from "../../components/Home_Components/Header/Header";
import About from "../../components/Home_Components/About/About";
import Footer from "../../components/Home_Components/Footer/Footer";
import Contact from "../../components/Home_Components/Contact/Contact";
import HeaderVideo from "../../components/Home_Components/Header/HeaderVideo";

export default function VideoHome() {
  return (
    <>
      <HeaderVideo />
      <About />

      <Contact />
      <Footer />
    </>
  );
}
