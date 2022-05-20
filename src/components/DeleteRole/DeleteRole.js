import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RolesServices from "../../services/roles";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function DeleteRole({ rolesToDelete, fetchAndSet, eventID }) {
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleClick = (e) => {
    e.preventDefault();

    RolesServices.deleteRole(rolesToDelete)
      .then((result) => {
        fetchAndSet(eventID);
        setSnackbar({
          children: "role sucessfully deleted",
          severity: "success",
        });
      })
      .catch(() =>
        setSnackbar({ children: "il y a eu une erreur", severity: "error" })
      );
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        variant="outlined"
        startIcon={<DeleteIcon />}
      >
        Supprimer
      </Button>

      {snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}
