import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import AttendeesServices from "../../services/attendees";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function FormAdd({ fetchAndSetAttendees }) {
  let params = useParams();

  const [checkedActivities, setCheckedActivities] = useState([]);
  const [allRole, setAllRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [allActivities, setAllActivities] = useState([]);
  const [body, setBody] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    extra_activities: [],
    role: "",
    event: params.eventID,
  });

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    handleBodyChange(event);
  };

  const handleActivitiesChange = (event) => {
    const {
      target: { value },
    } = event;
    setCheckedActivities(typeof value === "string" ? value.split(",") : value);
    handleBodyChange(event);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AttendeesServices.createAttendees(body).then((result) =>
      fetchAndSetAttendees(params.eventID)
    );
  };

  const updateBody = (key, value) => {
    setBody({ ...body, [key]: value });
  };

  const handleBodyChange = (event) => {
    const { name, value } = event.target;
    updateBody(name, value);
  };

  useEffect(() => {
    AttendeesServices.getRoles().then((result) => {
      setAllRole(result.data);
    });
  }, []);

  useEffect(() => {
    AttendeesServices.getActivities().then((result) => {
      setAllActivities(result.data);
    });
  }, []);

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
            id="outlined-name-required"
            label="Name"
            name="name"
          />
          <TextField
            required
            id="outlined-surname-required"
            label="Surname"
            name="surname"
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-email-required"
            label="Email"
            name="email"
          />
          <TextField
            required
            id="outlined-phone-required"
            label="Phone"
            name="phone"
          />
        </div>
        <div>
          <FormControl sx={{ m: 1, width: "100%", maxWidth: 250 }}>
            <InputLabel id="select-activities-label">Activities</InputLabel>
            <Select
              labelId="select-activities-label"
              id="select-activities"
              multiple
              value={checkedActivities}
              onChange={handleActivitiesChange}
              input={<OutlinedInput label="Activities" />}
              //renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              name="extra_activities"
            >
              {allActivities
                .filter((value) => {
                  return value.event === body.event;
                })
                .filter((value) => {
                  return value.role !== selectedRole;
                })
                .map((value) => {
                  return (
                    <MenuItem key={value._id} value={value._id}>
                      <Checkbox
                        checked={checkedActivities.indexOf(value._id) > -1}
                      />
                      {value.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>

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
                return <MenuItem value={value._id}>{value.name}</MenuItem>;
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
