import { Grid, Button } from "@mui/material";
import React from "react";
import EditProfile from "./EditProfile";
import { Item } from "./Item";

export default function DisplayProfile({
  currentUser,
  setCurrentUser,
  fetchAndSetCurrentUser,
}) {
  return (
    <div>
      <Grid container direction="row" spacing={2} justifyContent="center">
        <Item>
          Name : <span>{currentUser.name}</span>
        </Item>
      </Grid>
      <Grid container direction="row" spacing={2} justifyContent="center">
        <Item>
          Email : <span>{currentUser.email}</span>
        </Item>
      </Grid>
      <Grid
        container
        direction="row"
        spacing={2}
        justifyContent="center"
        marginTop={2}
      >
        <EditProfile
          currentUser={currentUser}
          fetchAndSetCurrentUser={fetchAndSetCurrentUser}
        />
      </Grid>
    </div>
  );
}
