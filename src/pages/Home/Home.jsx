import React from "react";
import Header from "../../components/Header/Header";
import styled, { css } from "styled-components";

export default function Home() {
  const Container = styled.div`
    height: 100vh;
    overflow: hidden;
    position: relative;
  `;

  const Shape = css`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  `;

  const IntoShape = styled.div`
    ${Shape}
    clip-path: polygon(0% 0%, 55% 0%, 65% 100%, 0% 100%);
    background-color: var(--color-primary);
    @media only screen and (max-width: 1024px) {
      display: none;
    }
  `;

  return (
    <section>
      <Container>
        <Header />
        <IntoShape></IntoShape>
      </Container>
    </section>
  );
}
