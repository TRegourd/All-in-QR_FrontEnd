import React from "react";
import crowd from "../../../assets/crowd.jpeg";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  background: rgb(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
  height: 100vh;
  //padding: 0 1rem;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  width: 65%;
  //display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-withe);
  //padding-top: 1rem;

  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

const Desc = styled.p`
  width: 80%;
  font-size: 15px;
  padding: 20px;
  border-radius: 10px;
  text-align: justify;
  background: rgb(0, 0, 0, 0.6);
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;

const Right = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
  color: var(--color-withe);
  padding-top: 1rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function About() {
  return (
    <Container>
      <Left>
        <Image src={crowd} />
      </Left>
      <Right>
        <Desc>
          Manage your events on our web application and set up a quick and easy
          to control check-in through our mobile application.
        </Desc>
      </Right>
    </Container>
  );
}
