import { Button } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../../assets/logo_all-in-qr-livetag.svg";
import { AuthContext } from "../../../AuthProvider";

const Header = () => {
  const { logged } = useContext(AuthContext);
  return (
    <Container>
      <Left>
        <Title>Make your events managment easier</Title>
        <Desc>
          Manage your events on our web application and set up a quick and easy
          to control check-in through our mobile application.
        </Desc>
        <Buttons>
          {!logged && (
            <Link to="/login">
              <Button variant="contained">GET STARTED</Button>
            </Link>
          )}
          <Button variant="outlined">CONTACT US</Button>
        </Buttons>
      </Left>
      <Right>
        <Image src={Logo} />
      </Right>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  align-content: center;
  padding: 25vh 1rem;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
  color: var(--color-withe);
  padding-top: 1rem;
  @media only screen and (max-width: 480px) {
    width: 100%;
    height: 100%;
  }

  @media only screen and (max-width: 1024px) {
    color: var(--color-primary);
  }
`;

const Title = styled.h2`
  width: 70%;
  font-size: 50px;
  @media only screen and (max-width: 480px) {
    width: 100%;
    font-size: 50px;
  }
`;

const Desc = styled.p`
  width: 70%;
  font-size: 20px;
  margin-top: 20px;
  text-align: justify;
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;

const Buttons = styled.div`
  width: 60%;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  @media only screen and (max-width: 480px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Right = styled.div`
  width: 40%;
  display: flex;
  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

const Image = styled.img`
  width: 100%;
`;
