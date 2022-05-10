import React from "react";
import styled from "styled-components";

function Event({ event }) {
  return (
    <Card>
      <CardTitle>
        <h2>{event.name}</h2>
      </CardTitle>
      <p>{event.place}</p>
      <p>test</p>
      <button>Supprimer</button>
    </Card>
  );
}

const Card = styled.div`
  cursor: pointer;
  height: 30vh;
  margin: 2rem;
  display: flex;
  align-items: center;
  width: 20rem;
  flex-direction: column;
  border-radius: 2rem;
  background-color: #a7a7a7;
  :hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const CardTitle = styled.div`
  margin: 5rem;
  text-align: center;
`;

export default Event;
