import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import AttendeesServices from "../../services/attendees";

export default function FormAdd() {
  const [checked, setChecked] = useState([]);
  const [allRole, setAllRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  useEffect(() => {
    AttendeesServices.getRoles().then((result) => {
      setAllRole(result.data);
    });
  }, []);

  console.log(selectedRole);

  return (
    <Box
      component="form"
      noValidate
      sx={{
        "& .MuiTextField-root": { m: 1, width: 250 },
      }}
    >
      <div>
        <div>
          <TextField required id="outlined-name-required" label="Name" />
          <TextField required id="outlined-surname-required" label="Surname" />
        </div>
        <div>
          <TextField required id="outlined-email-required" label="Email" />
          <TextField required id="outlined-phone-required" label="Phone" />
        </div>
        <div>
          <List
            sx={{ width: "100%", maxWidth: 250, bgcolor: "background.paper" }}
          >
            {["backstage", "cafeteria", "stand"].map((value) => {
              const labelId = `checkbox-list-label-${value}`;
              return (
                <ListItem key={value} disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(value)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${value}`} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <FormControl sx={{ width: "100%", maxWidth: 250 }}>
            <InputLabel id="select-role-label">Role</InputLabel>
            <Select
              labelId="select-role-label"
              id="select-role"
              value={selectedRole}
              label="Role"
              onChange={handleRoleChange}
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
