import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import styled from "styled-components";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AttendeesServices from "../../services/attendees";
import SendRegisterEmailSnackbar from "./sendRegisterEmailSnackbar";
import { useParams } from "react-router-dom";
import RolesServices from "../../services/roles";

export default function AttendeeEmailForm() {
  const params = useParams();
  const [body, setBody] = useState({
    email: "",
    roleId: "",
    eventId: params.eventID,
  });
  const [allRole, setAllRole] = useState([]);

  function updateBody(key, value) {
    setBody({ ...body, [key]: value });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    updateBody(name, value);
  }

  useEffect(() => {
    RolesServices.listRoles(params.eventID).then((result) => {
      setAllRole(result.data);
    });
  }, []);

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
        <h1>Email Register Link</h1>
        {/* <pre>{JSON.stringify(body, null, 2)}</pre> */}
        <div>
          <TextField
            required
            id="outlined-email-required"
            label="Email"
            type="email"
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
        </div>
        <SendRegisterEmailSnackbar body={body}></SendRegisterEmailSnackbar>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  overflow: hidden;
  position: relative;
`;
