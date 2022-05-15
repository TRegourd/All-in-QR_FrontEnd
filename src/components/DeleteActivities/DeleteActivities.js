import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ActivitiesServices from "../../services/activities";

export default function DeleteActivities({ result, eventID, fetchAndSet }) {
  const handleClick = () => {
    ActivitiesServices.deleteActivities(result._id)
      .then(() => {
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
