import React, { useEffect, useState } from "react";
import eventServices from "../../services/Event";
import styled from "styled-components";
import { Link } from "react-router-dom";
import EventCard from "../../components/Event/EventCard";
import NewEvent from "../CreateEvent/NewEvent";
import authServices from "../../services/auth";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState();

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

  function fetchAndSetUserList() {
    authServices
      .getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => alert("erreur"));
  }

  React.useEffect(() => {
    fetchAndSetUserList();
  }, []);

  return (
    <Container>
      {currentUser && (
        <NewEvent
          fetchAndSetEvents={fetchAndSetEvents}
          currentUser={currentUser}
        ></NewEvent>
      )}
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
    </Container>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
`;

export default Dashboard;
