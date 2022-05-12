import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AttendeesServices from "../../services/attendees";
import Role from "../Role/Role";

function RoleList() {
  const [roles, setRoles] = useState([]);
  let params = useParams();

  function fetchAndSetRoles(eventID) {
    AttendeesServices.getRoles(eventID)
      .then((result) => {
        setRoles(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    fetchAndSetRoles(params.eventID);
  }, []);

  return (
    <section>
      <div>
        <h2>Liste des rôles</h2>
      </div>
      <div>
        {roles.map((role) => {
          return (
            <div>
              <Role role={role} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default RoleList;
