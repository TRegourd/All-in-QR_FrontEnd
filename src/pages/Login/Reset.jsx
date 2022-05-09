import React, { useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import styled from "styled-components";
import authServices from "../../services/auth";

export default function Reset() {
  const { logged, setLogged } = useContext(AuthContext);
  const [body, setBody] = useState({
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const props = useParams();
  console.log(props);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(body);
    const id = props.id;
    console.log(id);
    authServices
      .reset(body, id)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
        alert("incorrect");
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
