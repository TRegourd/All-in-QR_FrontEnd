import React from "react";
import Styled from "styled-components";

import { DeleteRole } from "../DeleteRole/DeleteRole";
import ModifyRoles from "../ModifyRoles/ModifyRoles";
function Role({ role, eventID, fetchAndSetRoles }) {
  return (
    <RoleStyle>
      <div className="roleName">{role.name}</div>
      <ModifyRoles
        result={role}
        eventID={eventID}
        fetchAndSetRoles={fetchAndSetRoles}
      />
      <DeleteRole
        data={role}
        eventID={eventID}
        fetchAndSetRoles={fetchAndSetRoles}
      ></DeleteRole>
    </RoleStyle>
  );
}

const RoleStyle = Styled.div`
  display: flex;
  margin: 1rem; 
  padding: 1rem;
  border-radius : 20px;
  align-items : center; 
  div {
      width: 100%;
  }
  .roleName {
      font-size : 18px;
  }
`;

export default Role;
