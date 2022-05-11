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
      <h1>My profile</h1>
      <Grid container direction="row" spacing={2} justifyContent="center">
        <Item>
          Company Name : <span>{currentUser.name}</span>
        </Item>
      </Grid>
      <Grid container direction="row" spacing={2} justifyContent="center">
        <Item>
          User Name : <span>{currentUser.admin_name}</span>
        </Item>
      </Grid>
      <Grid container direction="row" spacing={2} justifyContent="center">
        <Item>
          User SurName : <span>{currentUser.admin_surname}</span>
        </Item>
      </Grid>
      <Grid container direction="row" spacing={2} justifyContent="center">
        <Item>
          Adress : <span>{currentUser.adress}</span>
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
