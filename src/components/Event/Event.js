import React from "react";
import styled from "styled-components";
import afterwork from "../../assets/afterwork.jpg";
import dayjs from "dayjs";
import EventServices from "../../services/Event";

function Event({ event, fetchAndSetEvents }) {
  function deleteEvent(e) {
    e.preventDefault();
    let confirmed = window.confirm(
      "Etes-vous sûr de vous supprimer l'évènement? Les données des participants et activitées seront supprimées."
    );
    if (confirmed === true) {
      EventServices.deleteOneEvent(event._id)
        .then(fetchAndSetEvents())
        .catch((err) => console.log(err));
    } else {
      alert("Suppression annulée.");
    }
  }

  return (
    <Card>
      <img src={afterwork} alt="backgroundimg" />
      <CardTitle>
        <h2>{event.name}</h2>
      </CardTitle>
      <p>{event.place}</p>
      <p>Du {dayjs(event.start_date).format("DD-MM-YY")}</p>
      <p>Au {dayjs(event.end_date).format("DD-MM-YY")}</p>
      <div>
        <button onClick={deleteEvent}>Supprimer</button>
        <button>Modifier</button>
      </div>
    </Card>
  );
}

const Card = styled.div`
  cursor: pointer;
  height: 30vh;
  margin: 1rem;
  display: flex;
  align-items: center;
  width: 20rem;
  overflow: hidden;
  flex-direction: column;
  border-radius: 2rem;
  background-color: #a7a7a7;
  :hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  img {
    width: 100%;
    object-fit: fill;
    -webkit-mask-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(0, 0, 0, 1)),
      to(rgba(0, 0, 0, 0))
    );
  }
  button {
    padding: 0.5rem;
    margin: 0.5rem;
    cursor: pointer;
    border-radius: 20px;

    :hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
  }
`;

const CardTitle = styled.div`
  text-align: center;
  position: absolute;
`;

export default Event;
