import { Button } from "@mui/material";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import RolesServices from "../../services/roles";

export default function AddRoles({ fetchAndSet }) {
  let params = useParams();

  const [body, setBody] = useState({
    name: "",
    event: params.eventID,
  });

  const updateBody = (key, value) => {
    setBody({ ...body, [key]: value });
  };

  const handleBodyChange = (event) => {
    const { name, value } = event.target;
    updateBody(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    RolesServices.createRoles(body).then(() => {
      fetchAndSet(params.eventID);
      e.target.reset();
    });
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: 250 },
        }}
        noValidate
        onChange={handleBodyChange}
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            id="outlined-role"
            label="role"
            variant="outlined"
            name="name"
          />
        </div>
        <div>
          <Button type="submit" variant="outlined">
            Créer
          </Button>
        </div>
      </Box>
    </div>
  );
}
