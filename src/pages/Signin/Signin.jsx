import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import authServices from "../../services/auth";
import SigninSnackbar from "../../components/Log_Components/SigninSnackbar";

export default function Signin() {
  const [body, setBody] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    authServices
      .signin(body)
      .then(() => {
        alert("user successfully created");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        alert("incorrect entry");
      });
  }

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
        onSubmit={handleSubmit}
        onChange={handleChange}
        style={{ marginTop: "100px" }}
      >
        <h1>Sign In</h1>
        <div>
          <TextField
            required
            id="outlined-first_name-required"
            label="Company Name"
            type="text"
            name="name"
          />
          <TextField
            required
            id="outlined-email-required"
            label="Email"
            type="email"
            name="email"
          />
          <br />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            name="password"
          />
          <TextField
            id="outlined-confirmPassword-input"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            name="confirmPassword"
          />
        </div>
        <SigninSnackbar body={body}></SigninSnackbar>
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
