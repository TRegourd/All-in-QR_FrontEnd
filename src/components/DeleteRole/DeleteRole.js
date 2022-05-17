import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RolesServices from "../../services/roles";

export default function DeleteRole({ rolesToDelete, fetchAndSet, eventID }) {
  const handleClick = (e) => {
    e.preventDefault();

    RolesServices.deleteRole(rolesToDelete)
      .then((result) => {
        fetchAndSet(eventID);
      })
      .catch(() => alert("erreur"));
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
    </div>
  );
}
