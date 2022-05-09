import React from "react";
import crowd from "../../../assets/crowd.jpeg";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
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

const Title = styled.h2`
  width: 70%;
  font-size: 20px;
  @media only screen and (max-width: 480px) {
    width: 100%;
    font-size: 50px;
  }
`;

const Desc = styled.p`
  width: 70%;
  font-size: 10px;
  margin-top: 20px;
  text-align: justify;
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

  @media only screen and (max-width: 1024px) {
    color: var(--color-primary);
  }
`;

const Image = styled.img`
  width: 100%;
`;

export default function About() {
  return (
    <Container>
      <Left>
        <Image src={crowd} />
      </Left>
      <Right>
        <Title>Make your events managment easier</Title>
        <Desc>
          Manage your events on our web application and set up a quick and easy
          to control check-in through our mobile application.
        </Desc>
      </Right>
    </Container>
  );
}
