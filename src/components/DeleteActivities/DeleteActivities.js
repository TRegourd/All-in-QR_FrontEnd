import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ActivitiesServices from "../../services/activities";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function DeleteActivities({
  activitiesToDelete,
  fetchAndSet,
  eventID,
}) {
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleClick = (e) => {
    e.preventDefault();
    ActivitiesServices.deleteActivities(activitiesToDelete)
      .then((result) => {
        fetchAndSet(eventID);
        setSnackbar({
          children: "activity sucessfully deleted",
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
        variant="outlined"
        onClick={handleClick}
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
