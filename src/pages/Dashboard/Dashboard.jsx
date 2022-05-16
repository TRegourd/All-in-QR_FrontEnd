import React, { useEffect, useState } from "react";
import eventServices from "../../services/Event";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CreateEvent from "../CreateEvent/CreateEvent";
import EventCard from "../../components/Event/EventCard";

function Dashboard() {
  const [events, setEvents] = useState([]);

  function fetchAndSetEvents() {
    eventServices
      .getEventList()
      .then((result) => setEvents(result))
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchAndSetEvents();
  }, []);

  return (
    <>
      <CreateEvent fetchAndSetEvents={fetchAndSetEvents}></CreateEvent>
      <div>
        <EventTitle>Mes évènements</EventTitle>
      </div>
      <EventsContainer>
        {events.map((event) => {
          return (
            <div key={event._id}>
              <Link to={`/${event._id}`}>
                <EventCard
                  event={event}
                  fetchAndSetEvents={fetchAndSetEvents}
                ></EventCard>
              </Link>
            </div>
          );
        })}
      </EventsContainer>
    </>
  );
}

const EventTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const EventsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

export default Dashboard;
