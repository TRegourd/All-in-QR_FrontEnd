import React from "react";
import styled from "styled-components";
import ResetCard from "./ResetCard";

export default function Reset() {
  return (
    <Container>
      <ResetCard></ResetCard>
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
