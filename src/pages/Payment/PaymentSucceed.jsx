import { Button } from "@mui/material";
import React, { memo, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AttendeesServices from "../../services/attendees";

export default function PaymentSucceed() {
  const [body, setBody] = useState(JSON.parse(localStorage.getItem("@body")));

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
