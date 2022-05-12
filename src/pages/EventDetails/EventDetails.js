import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-scroll";
import eventServices from "../../services/Event";
import FormAdd from "../../components/Add_Attendees/FormAdd";
import AttendeeList from "../../components/AttendeeList/AttendeeList";
import AttendeesServices from "../../services/attendees";
import RoleList from "../../components/RoleList/RoleList";
import AddRoles from "../../components/AddRoles/AddRoles";
import RolesServices from "../../services/roles";
import AttendeeEmailForm from "../../components/Add_Attendees/AttendeeEmailForm";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";

function EventDetails() {
  let params = useParams();
  const [eventData, setEventData] = useState({});

  function fetchAndSetOneEvent(eventID) {
    eventServices
      .getOneEvent(eventID)
      .then((result) => setEventData(result))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchAndSetOneEvent(params.eventID);
  }, []);

  const [roles, setRoles] = useState([]);

  function fetchAndSetRoles(eventID) {
    RolesServices.listRoles(eventID).then((result) => {
      setRoles(result.data);
    });
  }

  useEffect(() => {
    fetchAndSetRoles(params.eventID);
  }, []);

  const [attendees, setAttendees] = useState([]);

  function fetchAndSetAttendees(eventID) {
    AttendeesServices.getAttendeesList(eventID)
      .then((result) => setAttendees(result))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchAndSetAttendees(params.eventID);
  }, []);

  return (
    <EventContainer>
      <NavContainer>
        <section>
          <ul>
            <li>
              <Link activeClass="active" smooth spy to="details">
                Events Detail
              </Link>
            </li>
            <li>
              <Link activeClass="active" smooth spy to="roles">
                Roles
              </Link>
            </li>
            <li>
              <Link activeClass="active" smooth spy to="activities">
                Activities
              </Link>
            </li>
            <li>
              <Link activeClass="active" smooth spy to="attendees">
                Attendees
              </Link>
            </li>
          </ul>
        </section>
      </NavContainer>
      <EventDataContainer>
        <section className="eventSection" id="details">
          <h2>Event Details</h2>
          <div>{eventData.name}</div>
        </section>
        <section className="eventSection" id="roles">
          <h2>Roles</h2>
          <AddRoles fetchAndSetRoles={fetchAndSetRoles} />
              <RoleList fetchAndSetRoles={fetchAndSetRoles}></RoleList>
        </section>
        <section className="eventSection" id="activities">
          <h2>Activities</h2>
        </section>
        <section className="eventSection" id="attendees">
          <h2>Attendees</h2>
          <AttendeesFormContainer>
            <FormAdd
              fetchAndSetAttendees={fetchAndSetAttendees}
              roles={roles}
            />
            <p>OR</p>
            <AttendeeEmailForm />
          </AttendeesFormContainer>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Attendees List</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* <AttendeeList
                attendees={attendees}
                fetchAndSetAttendees={fetchAndSetAttendees}
              /> */}
            </AccordionDetails>
          </Accordion>
        </section>
      </EventDataContainer>
    </EventContainer>

  );
}

export default EventDetails;

const AttendeesFormContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 10px;
  align-items: center;
`;

const EventDataContainer = styled.div`
  margin-left: 1rem;
  .eventSection {
    height: 100vh;
    padding-top: 4rem;
  }
`;
const EventContainer = styled.div`
  display: flex;
`;

const NavContainer = styled.div`
  top: 0;
  position: sticky;
  bottom: 0;
  align-items: center;
  width: 10rem;
  background-color: lightgray;
  height: 100vh;
  padding: 10rem 1rem;
  box-shadow: 0 0.125rem 0.25rem 0 rgb(0 0 0 / 11%);
  li {
    cursor: pointer;
  }
  li:hover {
    text-decoration: underline;
  }
  .active {
    font-weight: bold;
  }
  ul {
  }
`;
