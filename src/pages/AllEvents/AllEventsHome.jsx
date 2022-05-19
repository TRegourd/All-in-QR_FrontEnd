import React from "react";
import About from "../../components/Home_Components/About/About";
import Footer from "../../components/Home_Components/Footer/Footer";
import Contact from "../../components/Home_Components/Contact/Contact";
import AllEventsHeader from "../../components/AllEventsComponents/AllEventsHeader/AllEvents";
import EventsCarousel from "../../components/AllEventsComponents/AllEventsCarousel/EventsCarousel";

export default function AllEventsHome() {
  return (
    <>
      <AllEventsHeader />
      <EventsCarousel />
      <Contact />
      <Footer />
    </>
  );
}
