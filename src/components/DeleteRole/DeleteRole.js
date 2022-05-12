import { Button } from "@mui/material";
import AttendeesServices from "../../services/attendees";

export function DeleteRole(data) {
  const handleClick = () => {
    console.log(data.data._id);
    AttendeesServices.deleteRole(data.data._id)
      .then(() => {
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
