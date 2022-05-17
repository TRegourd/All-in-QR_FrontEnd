import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ActivitiesServices from "../../services/activities";

export default function DeleteActivities({
  activitiesToDelete,
  fetchAndSet,
  eventID,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    ActivitiesServices.deleteActivities(activitiesToDelete)
      .then((result) => {
        fetchAndSet(eventID);
      })
      .catch(() => alert("erreur"));
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
    </div>
  );
}
