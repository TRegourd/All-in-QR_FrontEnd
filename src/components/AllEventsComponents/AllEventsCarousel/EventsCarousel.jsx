import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import eventServices from "../../../services/Event";
import CarouselEventCard from "./CarouselEventCard";
import "./EventsCarousel.css";

// Because this is an inframe, so the SSR mode doesn't not do well here.
// It will work on real devices.
const EventCarousel = ({ deviceType }) => {
  const [events, setEvents] = useState([]);

  function fetchAndSetEvents() {
    eventServices
      .getAllEventList()
      .then((result) => setEvents(result))
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchAndSetEvents();
  }, []);

  return (
    <div id="events" className="carouselContainer">
      <div className="topCarousel">
        <p>Current Events</p>
        <Carousel
          ssr
          partialVisibile
          deviceType={deviceType}
          itemClass="image-item"
          responsive={responsive}
          infinite={true}
        >
          {events.map((event) => {
            if (
              dayjs(event.start_date).format("YYYY-MM-DD") <=
                dayjs().format("YYYY-MM-DD") &&
              dayjs().format("YYYY-MM-DD") <=
                dayjs(event.end_date).format("YYYY-MM-DD")
            )
              return (
                <div
                  style={{
                    filter: "drop-shadow(2px 4px 6px gray)",
                  }}
                  key={event._id}
                >
                  <Link to={`/register/${event._id}/visitor`}>
                    <CarouselEventCard event={event}></CarouselEventCard>
                  </Link>
                </div>
              );
          })}
        </Carousel>
      </div>
      <div className="botCarousel">
        <p>Upcomming Events</p>
        <Carousel
          ssr
          partialVisibile
          deviceType={deviceType}
          itemClass="image-item"
          responsive={responsive}
          infinite={true}
        >
          {events.map((event) => {
            if (
              dayjs(event.start_date).format("YYYY-MM-DD") >
              dayjs().format("YYYY-MM-DD")
            )
              return (
                <div
                  style={{
                    filter: "drop-shadow(2px 4px 6px gray)",
                  }}
                  key={event._id}
                >
                  <Link to={`/register/${event._id}/visitor`}>
                    <CarouselEventCard event={event}></CarouselEventCard>
                  </Link>
                </div>
              );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default EventCarousel;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};
