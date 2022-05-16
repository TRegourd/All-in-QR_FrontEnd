import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import styled from "styled-components";
import {
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AttendeesServices from "../../services/attendees";
import SendRegisterEmailSnackbar from "./sendRegisterEmailSnackbar";
import { useParams } from "react-router-dom";
import MultipleEmailsTooltip from "./MultipleEmailTooltip";

export default function AttendeeEmailForm({ roles }) {
  const params = useParams();

  const [open, setOpen] = useState(false);

  const [body, setBody] = useState({
    email: "",
    roleId: "",
    eventId: params.eventID,
  });
  const allRole = roles;

  function updateBody(key, value) {
    setBody({ ...body, [key]: value });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    updateBody(name, value);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Button variant="outlined" onClick={handleClickOpen}>
        Email Register Links
      </Button>
      <Dialog
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onClose={handleClose}
        open={open}
        onChange={handleChange}
        style={{ marginTop: "50px" }}
      >
        <DialogTitle>
          envoyer le formulaire par mail
          {/* <pre>{JSON.stringify(body, null, 2)}</pre> */}
          <MultipleEmailsTooltip></MultipleEmailsTooltip>
        </DialogTitle>
        <DialogContent>
          <TextField
            required
            id="outlined-email-required"
            label="Email"
            type="text"
            name="email"
          />

          <FormControl sx={{ m: 1, width: "100%", maxWidth: 250 }}>
            <InputLabel id="select-role-label">Role</InputLabel>
            <Select
              labelId="select-role-label"
              id="select-role"
              defaultValue=""
              label="Role"
              onChange={handleChange}
              name="roleId"
            >
              {allRole.map((value) => {
                return (
                  <MenuItem key={value._id} value={value._id}>
                    {value.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <SendRegisterEmailSnackbar
            body={body}
            handleCloseForm={handleClose}
          ></SendRegisterEmailSnackbar>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

const Container = styled.div`
  overflow: hidden;
  position: relative;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;
