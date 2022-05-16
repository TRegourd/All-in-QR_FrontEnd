import React from "react";
import styled from "styled-components";
import ForgotCard from "./FogrotCard";

export default function Forgot() {
  return (
    <Container>
      <ForgotCard></ForgotCard>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  padding-top: 3rem;
  text-align: center;
  overflow: hidden;
  position: relative;
`;
