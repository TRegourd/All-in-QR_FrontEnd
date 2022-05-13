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
import AddACtivities from "../../components/AddActivities/AddActivities";
import ActivitiesServices from "../../services/activities";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";
import SendQRCodeToAll from "../../components/SendQRCodeToEveryAttendee/SendQRCodeToEveryAttendee";
import dayjs from "dayjs";
import { Item } from "../../components/Profile_Components/Item";
import EditEvent from "../../components/Event/EditEvent";
import ActivitiesList from "../../components/ActivitiesList/ActivitiesList";
import {
  BsCalendarEventFill,
  BsFillPersonLinesFill,
  BsFillPeopleFill,
  BsFilterSquareFill,
} from "react-icons/bs";

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

  const [activities, setActivities] = useState([]);

  function fetchAndSetActivities(eventID) {
    ActivitiesServices.listActivities(eventID).then((result) => {
      setActivities(result.data);
    });
  }

  useEffect(() => {
    fetchAndSetActivities(params.eventID);
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
              <Link
                className="eventNavLink"
                activeClass="active"
                smooth
                spy
                to="details"
              >
                <BsCalendarEventFill />
                <span>Events Detail</span>
              </Link>
            </li>
            <li>
              <Link
                className="eventNavLink"
                activeClass="active"
                smooth
                spy
                to="roles"
              >
                <BsFillPersonLinesFill />
                <span>Roles</span>
              </Link>
            </li>
            <li>
              <Link
                className="eventNavLink"
                activeClass="active"
                smooth
                spy
                to="activities"
              >
                <BsFilterSquareFill></BsFilterSquareFill>
                <span>Activities</span>
              </Link>
            </li>
            <li>
              <Link
                className="eventNavLink"
                activeClass="active"
                smooth
                spy
                to="attendees"
              >
                <BsFillPeopleFill />
                <span>Attendees</span>
              </Link>
            </li>
          </ul>
        </section>
      </NavContainer>
      <EventDataContainer>
        <section className="eventSection" id="details">
          <h2>Event Details</h2>
          <Item>
            <h3>{eventData.name}</h3>
            <h4>{eventData.desc}</h4>
          </Item>
          <Item>
            <div className="eventDateAndPlace">
              {eventData.type}
              <br />
              {eventData.place}
              <br />
              From {dayjs(eventData.start_date).format("DD-MM")} to{" "}
              {dayjs(eventData.end_date).format("DD-MM")}
            </div>
          </Item>
          <div className="eventInfoContainer">
            <Item>
              There is currently {attendees.length} attendees registered to this
              event
            </Item>
          </div>
          <EditEvent
            fetchEvent={fetchAndSetOneEvent}
            currentEvent={eventData}
          ></EditEvent>
        </section>
        <section className="eventSection" id="roles">
          <h2>Roles</h2>
          <AddRoles fetchAndSetRoles={fetchAndSetRoles} />
          <RoleList roles={roles} fetchAndSetRoles={fetchAndSetRoles} />
        </section>
        <section className="eventSection" id="activities">
          <h2>Activities</h2>
          <AddACtivities
            fetchAndSetActivities={fetchAndSetActivities}
            roles={roles}
          />
          <ActivitiesList
            activities={activities}
            fetchAndSetActivities={fetchAndSetActivities}
            roles={roles}
          />
        </section>
        <section className="eventSection" id="attendees">
          <h2>Attendees</h2>
          <AttendeesFormContainer>
            <FormAdd
              fetchAndSetAttendees={fetchAndSetAttendees}
              roles={roles}
              activities={activities}
            />
            <p>OR</p>
            <AttendeeEmailForm roles={roles} />
          </AttendeesFormContainer>
          <AttendeeList
            attendees={attendees}
            fetchAndSetAttendees={fetchAndSetAttendees}
            roles={roles}
            activities={activities}
          />
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Attendees List</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SendQRCodeToAll />
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
  margin-top: 4rem;
  top: 0;
  position: sticky;
  bottom: 0;
  align-items: center;
  width: 15rem;
  background-color: lightgray;
  height: 100vh;
  padding: 10rem 1rem;
  box-shadow: 0 0.125rem 0.25rem 0 rgb(0 0 0 / 11%);
  li {
    cursor: pointer;
    padding: 1rem;
  }
  .eventNavLink {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    font-size: 1.2rem;
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
