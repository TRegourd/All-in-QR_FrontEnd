import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ActivitiesServices from "../../services/activities";

export default function DeleteActivities({
  result,
  eventID,
  fetchAndSetActivities,
}) {
  const handleClick = () => {
    ActivitiesServices.deleteActivities(result._id)
      .then(() => {
        fetchAndSetActivities(eventID);
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
