import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import ActivitiesServices from "../../services/activities";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function AddACtivities({ fetchAndSetActivities, roles }) {
  let params = useParams();

  const allRole = roles;
  const [selectedRole, setSelectedRole] = useState("");
  const [date, setDate] = React.useState(new Date());
  const [body, setBody] = useState({
    name: "",
    date: "",
    duration: null,
    price: null,
    desc: "",
    role: "",
    event: params.eventID,
  });

  const handleDateChange = (event) => {
    setDate(event.$d);
    updateBody("date", event.$d);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ActivitiesServices.createActivities(body).then((result) => {
      fetchAndSetActivities(params.eventID);
    });
    e.target.reset();
    setSelectedRole("");
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    handleBodyChange(event);
  };

  const updateBody = (key, value) => {
    setBody({ ...body, [key]: value });
  };

  const handleBodyChange = (event) => {
    const { name, value } = event.target;
    updateBody(name, value);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      onChange={handleBodyChange}
      sx={{
        "& .MuiTextField-root": { m: 1, width: 250 },
      }}
    >
      <div>
        <div>
          <TextField
            required
            id="outlined-name"
            label="Name"
            name="name"
            variant="outlined"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="date"
              name="date"
              value={date}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          {/* <TextField
            required
            id="outlined-date"
            label="Date"
            type="date"
            name="date"
            variant="outlined" 
          /> */}
        </div>
        <div>
          <TextField
            required
            id="outlined-duration"
            label="Duration"
            name="duration"
            variant="outlined"
          />
          <TextField
            required
            id="outlined-price"
            label="Price"
            name="price"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-desc"
            label="Description"
            name="desc"
            variant="outlined"
          />

          <FormControl sx={{ m: 1, width: "100%", maxWidth: 250 }}>
            <InputLabel id="select-role-label">Role</InputLabel>
            <Select
              labelId="select-role-label"
              id="select-role"
              value={selectedRole}
              label="Role"
              onChange={handleRoleChange}
              name="role"
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
        <Button type="submit" variant="outlined">
          Créer
        </Button>
      </div>
    </Box>
  );
}
