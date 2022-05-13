import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import styled from "styled-components";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AttendeesServices from "../../services/attendees";
import SendRegisterEmailSnackbar from "./sendRegisterEmailSnackbar";
import { useParams } from "react-router-dom";
import MultipleEmailsTooltip from "./MultipleEmailTooltip";

export default function AttendeeEmailForm({ roles }) {
  const params = useParams();
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
        style={{ marginTop: "50px" }}
      >
        <TitleContainer>
          <h3>Email Register Link</h3>
          {/* <pre>{JSON.stringify(body, null, 2)}</pre> */}
          <MultipleEmailsTooltip></MultipleEmailsTooltip>
        </TitleContainer>
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
        <SendRegisterEmailSnackbar body={body}></SendRegisterEmailSnackbar>
      </Box>
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
