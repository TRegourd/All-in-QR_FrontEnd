import React from "react";
import styled from "styled-components";

import SigninCard from "./SigninCard";

export default function Signin() {
  return (
    <Container>
      <SigninCard></SigninCard>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 3rem;
  height: 100vh;
  text-align: center;
  overflow: hidden;
  position: relative;
`;
