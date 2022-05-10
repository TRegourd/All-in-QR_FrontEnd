import { Grid, Button } from "@mui/material";
import React from "react";
import { Item } from "./Item";

export default function DisplayProfile({ currentUser, edit, setEdit }) {
  function handleClick() {
    setEdit(true);
  }

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
        <Button
          //onClick={handleClick}
          variant="contained"
        >
          Edit Profile
        </Button>
      </Grid>
    </div>
  );
}
