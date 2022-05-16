import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import styled from "styled-components";
import authServices from "../../services/auth";

function getFormValue(elements, name) {
  return elements[name]?.value;
}

export default function CreateEvent({ fetchAndSetEvents }) {
  const [currentUser, setCurrentUser] = useState();
  const [type, setType] = useState("concert");

  function handleChangeSelect(e) {
    setType(e.target.value);
  }

  function fetchAndSetUserList() {
    authServices
      .getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => alert("erreur"));
  }

  useEffect(() => {
    fetchAndSetUserList();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const elements = e.target.elements;
    const name = getFormValue(elements, "name");
    const start_date = getFormValue(elements, "start_date");
    const end_date = getFormValue(elements, "end_date");
    const place = getFormValue(elements, "place");
    const desc = getFormValue(elements, "desc");
    const admin = currentUser._id;

    if (!name) {
      alert("Ajouter un nom.");
      return;
    }
    if (!start_date) {
      alert("Ajouter une date");
      return;
    }
    if (!end_date) {
      alert("Ajouter une date.");
      return;
    }
    if (!place) {
      alert("Ajouter un lieu.");
      return;
    }
    if (!desc) {
      alert("Ajouter une description.");
      return;
    }

    const newEvent = { name, start_date, end_date, place, desc, type };

    authServices
      .createEvent({ name, start_date, end_date, place, desc, admin, type })
      .then(() => {
        fetchAndSetEvents();
        alert("Event created");
      })
      .catch((err) => {
        console.log(err);
        alert("Can't create event");
      });
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
        method="POST"
      >
        <h1>Create an Event</h1>
        <div>
          <TextField
            id="outlined-event_name-required"
            label="Event Name"
            placeholder="Event Name"
            name="name"
            focused
          />
          <TextField
            id="outlined-start_date"
            label="Start date"
            type="date"
            name="start_date"
            focused
          />
          <TextField
            id="outlined-end_date"
            label="End date"
            type="date"
            name="end_date"
            focused
          />
          <TextField
            id="outlined-place"
            label="Place"
            type="text"
            name="place"
            placeholder="Place"
            focused
          />
          <TextField
            id="outlined-textarea"
            label="Description"
            type="text"
            name="desc"
            placeholder="Description"
            focused
          />
          <FormControl margin="dense" focused>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="type"
              value={type}
              onChange={handleChangeSelect}
              placeholder="Type"
              name="type"
            >
              <MenuItem value={"afterwork"}>Afterwork</MenuItem>
              <MenuItem value={"concert"}>Concert</MenuItem>
              <MenuItem value={"conference"}>Conference</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button type="submit" variant="outlined">
          Create
        </Button>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  overflow: hidden;
  position: relative;
`;
