import { Button } from "@mui/material";
import React, { memo, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AttendeesServices from "../../services/attendees";

export default function PaymentSucceed() {
  const [body, setBody] = useState(JSON.parse(localStorage.getItem("@body")));

  const wait = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1500);
    });
  };

  async function createAttendee(userBody) {
    if (userBody) {
      AttendeesServices.getOneAttendeeByEmail(userBody)
        .then((result) => {
          console.log(result.data);
          if (result.data === null) {
            AttendeesServices.createAttendees(userBody)
              .then(() => {
                console.log("successfully created");
                localStorage.removeItem("@body");
                setBody(null);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    createAttendee(body);
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
