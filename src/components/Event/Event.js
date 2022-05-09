import React from "react";
import styled from "styled-components";

function Event({ event }) {
  return (
    <Card>
      <h1>{event.name}</h1>
      <p>{event.place}</p>
    </Card>
  );
}

const Card = styled.div`
  cursor: pointer;
  height: 30vh;
  margin: 2rem;
  display: flex;
  align-items: center;
  width: auto;
  flex-direction: column;
  border-radius: 2rem;
  background-color: #a7a7a7;
  :hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

export default Event;
