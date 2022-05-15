import { useParams } from "react-router-dom";
import Role from "../Role/Role";

function RoleList({ roles, fetchAndSet }) {
  let params = useParams();
  return (
    <section>
      <div>
        <h2>Liste des rôles</h2>
      </div>
      <div>
        {roles.map((role) => {
          return (
            <div key={role._id}>
              <Role
                role={role}
                eventID={params.eventID}
                fetchAndSet={fetchAndSet}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default RoleList;
