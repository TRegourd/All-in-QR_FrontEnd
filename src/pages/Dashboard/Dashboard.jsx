import React, { useEffect, useState } from "react";
import Event from "../../components/Event/Event";
import eventServices from "../../services/Event";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CreateEvent from "../CreateEvent/CreateEvent";

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
    <section>
      <CreateEvent fetchAndSetEvents={fetchAndSetEvents}></CreateEvent>
      <div>
        <EventTitle>Mes évènements</EventTitle>
      </div>
      <EventsContainer>
        {events.map((event) => {
          return (
            <div>
              <Link to={`/${event._id}`} key={event._id}>
                <Event event={event} key={event._id} />
              </Link>
            </div>
          );
        })}
      </EventsContainer>
    </section>
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
  justify-content: space-around;
  flex-wrap: wrap;
`;

export default Dashboard;
