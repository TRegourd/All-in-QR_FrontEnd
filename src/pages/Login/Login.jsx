import React from "react";

import { useState } from "react";

import styled from "styled-components";

import LoginCard from "./LoginCard";

export default function Login() {
  return (
    <Container>
      <LoginCard></LoginCard>
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
