import { Button } from "@mui/material";
import React from "react";
import Styled from "styled-components";
import AttendeesServices from "../../services/attendees";
import { DeleteRole } from "../DeleteRole/DeleteRole";

function Role({ role, eventId, fetchAndSetAttendees }) {
  return (
    <RoleStyle>
      <div className="roleName">{role.name}</div>
      <DeleteRole
        data={role}
        eventId={eventId}
        fetchAndSetAttendees={fetchAndSetAttendees}
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
      width: 10%;
  }
  .roleName {
      font-size : 18px;
  }
`;

export default Role;
