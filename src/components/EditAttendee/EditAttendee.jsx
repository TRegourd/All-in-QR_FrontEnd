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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
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

export default function EditAttendee({
  result,
  eventID,
  fetchAndSetAttendees,
}) {
  const [open, setOpen] = useState(false);
  const [checkedActivities, setCheckedActivities] = useState(
    result.extra_activities.map((x) => x._id)
  );
  const [allRole, setAllRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState(result.role._id);
  const [allActivities, setAllActivities] = useState([]);
  const [body, setBody] = useState({
    name: result.name,
    surname: result.surname,
    email: result.email,
    phone: result.phone,
    extra_activities: result.extra_activities.map((x) => x._id),
    role: result.role._id,
    event: eventID,
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

  const handleSubmit = () => {
    AttendeesServices.modifyAttendee(result._id, body)
      .then((response) => {
        fetchAndSetAttendees(eventID);
        setOpen(false);
      })
      .catch(() => alert("erreur"));
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button varient="outlined" onClick={handleClickOpen}>
        Modifier le participant
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        onChange={handleBodyChange}
        sx={{
          "& .MuiTextField-root": { m: 1, width: 250 },
        }}
      >
        <DialogTitle>Modifier le participant</DialogTitle>
        <DialogContent>
          <div>
            <div>
              <TextField
                required
                id="outlined-name-required"
                label="Name"
                name="name"
                value={body.name}
              />
              <TextField
                required
                id="outlined-surname-required"
                label="Surname"
                name="surname"
                value={body.surname}
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-email-required"
                label="Email"
                name="email"
                value={body.email}
              />
              <TextField
                required
                id="outlined-phone-required"
                label="Phone"
                name="phone"
                value={body.phone}
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
          <Button onClick={handleSubmit}>Envoyer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
