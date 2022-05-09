import React, { useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import styled from "styled-components";
import authServices from "../../services/auth";

export default function Forgot() {
  const { logged, setLogged } = useContext(AuthContext);
  const [body, setBody] = useState({
    email: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    authServices
      .forgot(body)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
        alert("incorrect email");
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
        <h1>Forget Password</h1>
        <div>
          <TextField
            required
            id="outlined-email-required"
            label="Email"
            type="email"
            name="email"
          />
        </div>
        <Button type="submit" variant="outlined">
          Send Reset Link
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
