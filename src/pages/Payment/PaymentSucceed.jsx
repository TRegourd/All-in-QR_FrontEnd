import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AttendeesServices from "../../services/attendees";

export default function PaymentSucceed() {
  const body = localStorage.getItem("@body");
  console.log(JSON.parse(body));

  useEffect(() => {
    AttendeesServices.createAttendees(JSON.parse(body))
      .then(() => {
        console.log("successfully created");
        localStorage.removeItem("@body");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container className="checkout">
      <h1>Thank you for registering</h1>
      <p>
        We are currently processing your order and will send you a confirmation
        email shortly
      </p>
      <div>
        <Link to="/">
          <Button variant="contained">Return to HomePage</Button>
        </Link>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  padding-top: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  position: relative;
`;
