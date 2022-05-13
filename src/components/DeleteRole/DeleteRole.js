import { Button } from "@mui/material";
import AttendeesServices from "../../services/attendees";

export function DeleteRole({ data, eventID, fetchAndSetRoles }) {
  const handleClick = () => {
    AttendeesServices.deleteRole(data._id)
      .then(() => {
        fetchAndSetRoles(eventID);
        alert("Role deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button onClick={handleClick}>Supprimer</Button>
    </div>
  );
}
