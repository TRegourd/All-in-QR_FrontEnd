import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  TextField,
} from "@mui/material";
import AttendeesServices from "../../services/attendees";
import ActivitiesServices from "../../services/activities";

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

export default function FormAdd({ fetchAndSet, roles, activities }) {
  let params = useParams();

  const [open, setOpen] = useState(false);

  const [checkedActivities, setCheckedActivities] = useState([]);
  const allRole = roles;
  const [selectedRole, setSelectedRole] = useState("");
  const allActivities = activities;
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
    AttendeesServices.createAttendees(body).then((result) => {
      fetchAndSet(params.eventID);
      setOpen(false);
    });
  };

  const updateBody = (key, value) => {
    setBody({ ...body, [key]: value });
  };

  const handleBodyChange = (event) => {
    const { name, value } = event.target;
    updateBody(name, value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        créer un attendee
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        onChange={handleBodyChange}
        sx={{
          "& .MuiTextField-root": { m: 1, width: 250 },
        }}
      >
        <DialogContent>
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
                <InputLabel id="select-Extra Activities-label">
                  Extra Activities
                </InputLabel>
                <Select
                  labelId="select-Extra Activities-label"
                  id="select-Extra Activities"
                  multiple
                  value={checkedActivities}
                  onChange={handleActivitiesChange}
                  input={<OutlinedInput label="Extra Activities" />}
                  MenuProps={MenuProps}
                  name="extra_activities"
                >
                  {allActivities
                    .filter((value) => {
                      return value.event._id === body.event;
                    })
                    .filter((value) => {
                      if (value.role !== null) {
                        return value.role._id !== selectedRole;
                      }
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
                    return (
                      <MenuItem key={value._id} value={value._id}>
                        {value.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Créer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
