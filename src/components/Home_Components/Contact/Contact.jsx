import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  background: rgb(0, 0, 0, 0.4);
  backdrop-filter: blur(15px);
  color: white;
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const FormContainer = styled.div`
  width: 50%;
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  margin: 50px;
  margin-top: 0;
  text-align: center;
  @media only screen and (max-width: 480px) {
    margin: 20px;
  }
`;

const Form = styled.form`
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
  @media only screen and (max-width: 900px) {
    height: 400px;
  }
`;

const LeftForm = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20px;
  @media only screen and (max-width: 480px) {
    height: 50%;
    margin-right: 0;
  }
`;

const RightForm = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media only screen and (max-width: 480px) {
    height: 50%;
  }
`;

const Input = styled.input`
  width: 400px;
  height: 150px;
  padding: 20px;
  color: white;
  background: rgb(0, 0, 0, 0.6);
  backdrop-filter: blur(15px);
  @media only screen and (max-width: 900px) {
    padding: 5px;
    width: 200px;
    height: 100px;
  }
`;

const TextArea = styled.textarea`
  width: 400px;
  height: 80%;
  padding: 20px;
  background: rgb(0, 0, 0, 0.6);
  backdrop-filter: blur(15px);
  color: white;
  @media only screen and (max-width: 900px) {
    padding: 5px;
    margin-top: 20px;
    width: 200px;
  }
`;

const Contact = () => {
  return (
    <Container>
      <Wrapper>
        <FormContainer>
          <Title>
            Questions? <br /> Let's Get In Touch
          </Title>
          <Form>
            <LeftForm>
              <Input placeholder="Your Name" />
              <Input placeholder="Your Email" />
              <Input placeholder="Subject" />
            </LeftForm>
            <RightForm>
              <TextArea placeholder="Your Message" />
              <Button variant="contained">Send</Button>
            </RightForm>
          </Form>
        </FormContainer>
      </Wrapper>
    </Container>
  );
};

export default Contact;
