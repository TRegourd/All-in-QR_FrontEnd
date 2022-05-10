import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import DisplayProfile from "../../components/Profile_Components/DisplayProfile";
import LogOutSnackbar from "../../components/Profile_Components/LogoutSnackbar";
import authServices from "../../services/auth";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState();
  const { disconnect } = useContext(AuthContext);

  function fetchAndSetUserList() {
    authServices
      .getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => alert("erreur"));
  }

  useEffect(() => {
    fetchAndSetUserList();
    console.log(currentUser);
  }, []);

  return (
    <>
      {currentUser && (
        <section>
          <Grid container spacing={1} marginTop={2} justifyContent="center">
            <DisplayProfile
              currentUser={currentUser}
              //edit={edit}
              //setEdit={setEdit}
            ></DisplayProfile>

            <Grid
              container
              direction="row"
              marginTop={6}
              justifyContent="center"
            >
              <Grid item xs={2}>
                <LogOutSnackbar
                  className="profileItem"
                  onClick={disconnect}
                ></LogOutSnackbar>
              </Grid>
            </Grid>
          </Grid>
        </section>
      )}
    </>
  );
}
