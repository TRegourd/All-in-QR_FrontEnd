import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import styled from "styled-components";
import RegisterSnackbar from "../../components/Register_Components/RegisterSnackbar";
import AttendeesServices from "../../services/attendees";

export default function Register() {
  const navigate = useNavigate();
  const params = useParams();
  const [body, setBody] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    extra_activities: [],
    role: params.roleId,
    event: params.eventId,
  });

  function updateBody(key, value) {
    setBody({ ...body, [key]: value });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    updateBody(name, value);
  }

  return (
    <Container>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onChange={handleChange}
        style={{ marginTop: "100px" }}
      >
        <h1>Register to the event</h1>
        <div>
          <TextField required id="name" label="Name" type="text" name="name" />
          <TextField
            required
            id="surname"
            label="SurName"
            type="text"
            name="surname"
          />
          <br />
          <TextField
            required
            id="email"
            label="Email"
            type="email"
            name="email"
          />
          <TextField
            required
            id="phone"
            label="Phone"
            type="text"
            name="phone"
          />
        </div>
        <RegisterSnackbar body={body}></RegisterSnackbar>
        <br />
        <div className="signinToLoginLink" style={{ marginTop: "10px" }}>
          Already have an account ? <Link to="/login">{"LogIn"}</Link>
        </div>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  text-align: center;
  overflow: hidden;
  position: relative;
`;
