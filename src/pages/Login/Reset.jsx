import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import styled from "styled-components";
import authServices from "../../services/auth";

export default function Reset() {
  const [body, setBody] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const props = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    if (body.password === body.confirmPassword) {
      const id = props.id;
      authServices
        .reset(body, id)
        .then(() => {
          alert("password successfully reset");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          alert("incorrect");
        });
    } else {
      alert("Passwords does not match");
    }
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
        <h1>Forget Password</h1>
        <div>
          <TextField
            id="outlined-email-input"
            label="Email"
            type="email"
            autoComplete="current-email"
            name="email"
          />
          <TextField
            id="outlined-password-input"
            label="New Password"
            type="password"
            autoComplete="current-password"
            name="password"
          />
          <TextField
            id="outlined-confirmPassword-input"
            label="Confirm New Password"
            type="password"
            autoComplete="current-password"
            name="confirmPassword"
          />
        </div>
        <Button type="submit" variant="outlined">
          Reset Password
        </Button>
        <br />
        <div className="signinToLoginLink" style={{ marginTop: "10px" }}>
          Go back to <Link to="/login">{"Log in"}</Link>
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
