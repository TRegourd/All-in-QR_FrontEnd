import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import eventServices from "../../services/Event";
import FormAdd from "../../components/Add_Attendees/FormAdd";
import AttendeeList from "../../components/AttendeeList/AttendeeList";
import AttendeesServices from "../../services/attendees";
import RoleList from "../../components/RoleList/RoleList";
import AddRoles from "../../components/AddRoles/AddRoles";
import RolesServices from "../../services/roles";
import AttendeeEmailForm from "../../components/Add_Attendees/AttendeeEmailForm";
import styled from "styled-components";
import {
  BsCalendarEventFill,
  BsFillPersonLinesFill,
  BsFillPeopleFill,
  BsFilterSquareFill,
} from "react-icons/bs";
import ActivitiesServices from "../../services/activities";
import EventDetailsData from "./EventDetailsData";
import ActivitiesList from "../../components/ActivitiesList/ActivitiesList";
import AddACtivities from "../../components/AddActivities/AddActivities";
import AttendeeListCopy from "../../components/AttendeeList/AttendeeList copy";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, width: "80vw" }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function EventDetailsAndTab() {
  const [value, setValue] = React.useState(0);
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
  const [activities, setActivities] = useState([]);
  const [attendees, setAttendees] = useState([]);

  function fetchAndSet(eventID) {
    RolesServices.listRoles(eventID).then((result) => {
      setRoles(result.data);
    });
    ActivitiesServices.listActivities(eventID).then((result) => {
      setActivities(result.data);
    });
    AttendeesServices.getAttendeesList(eventID).then((result) =>
      setAttendees(result)
    );
  }

  useEffect(() => {
    fetchAndSet(params.eventID);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100vh",
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
        }}
      >
        <Tab
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            justifyContent: "flex-start",
            marginTop: 10,
          }}
          label="Event"
          icon={<BsCalendarEventFill />}
          {...a11yProps(0)}
        />
        <Tab
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            justifyContent: "flex-start",
          }}
          label="Roles"
          icon={<BsFillPersonLinesFill />}
          {...a11yProps(1)}
        />
        <Tab
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            justifyContent: "flex-start",
          }}
          label="Activities"
          icon={<BsFilterSquareFill />}
          {...a11yProps(2)}
        />
        <Tab
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            justifyContent: "flex-start",
          }}
          label="Attendees"
          icon={<BsFillPeopleFill />}
          {...a11yProps(3)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <EventDetailsData
          eventData={eventData}
          attendees={attendees}
          fetchAndSetOneEvent={fetchAndSetOneEvent}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h2>Roles</h2>
        <AddRoles fetchAndSet={fetchAndSet} />
        <RoleList roles={roles} fetchAndSet={fetchAndSet} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h2>Activities</h2>
        <AddACtivities fetchAndSet={fetchAndSet} roles={roles} />
        <ActivitiesList
          activities={activities}
          fetchAndSet={fetchAndSet}
          roles={roles}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h2>Attendees</h2>
        <AttendeesFormContainer>
          <FormAdd
            fetchAndSet={fetchAndSet}
            roles={roles}
            activities={activities}
          />
          <p>OR</p>
          <AttendeeEmailForm roles={roles} />
        </AttendeesFormContainer>
        <AttendeeList
          attendees={attendees}
          fetchAndSet={fetchAndSet}
          roles={roles}
          activities={activities}
        />
      </TabPanel>
    </Box>
  );
}

const AttendeesFormContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 10px;
  align-items: center;
`;
