import React from "react";
import Header from "../../components/Home_Components/Header/Header";
import styled, { css } from "styled-components";
import About from "../../components/Home_Components/About/About";
import Footer from "../../components/Home_Components/Footer/Footer";
import Contact from "../../components/Home_Components/Contact/Contact";

export default function Home() {
  return (
    <section>
      <Container>
        <Header />
        <HeaderShape></HeaderShape>
      </Container>
      <Container>
        <About />
        <AboutShape></AboutShape>
      </Container>
      <Container>
        <Contact />
        <Footer />
      </Container>
    </section>
  );
}

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

const HeaderShape = styled.div`
  ${Shape}
  clip-path: polygon(0% 0%, 55% 0%, 65% 100%, 0% 100%);
  background-color: var(--color-primary);
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;

const AboutShape = styled.div`
  ${Shape}
  clip-path: polygon(65% 0%, 100% 0%, 100% 100%, 65% 100%);
  background-color: var(--color-primary);
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;
