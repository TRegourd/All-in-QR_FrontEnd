import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
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
import AddACtivities from "../../components/AddActivities/AddActivities";
import ActivitiesServices from "../../services/activitiesServices";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";
import SendQRCodeToAll from "../../components/SendQRCodeToEveryAttendee/SendQRCodeToEveryAttendee";
import dayjs from "dayjs";
import { Item } from "../../components/Profile_Components/Item";
import EditEvent from "../../components/Event/EditEvent";
import {
  BsCalendarEventFill,
  BsFillPersonLinesFill,
  BsFillPeopleFill,
  BsFilterSquareFill,
} from "react-icons/bs";

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
        paddingTop: 10,
        position: "sticky",
        top: 0,
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            justifyContent: "flex-start",
          }}
          label="Events Details"
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
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h2>Roles</h2>
        <AddRoles fetchAndSetRoles={fetchAndSetRoles} />
        <RoleList roles={roles} fetchAndSetRoles={fetchAndSetRoles} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h2>Activities</h2>
        <AddACtivities
          fetchAndSetActivities={fetchAndSetActivities}
          roles={roles}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h2>Attendees</h2>
        <AttendeesFormContainer>
          <FormAdd
            fetchAndSetAttendees={fetchAndSetAttendees}
            roles={roles}
            activities={activities}
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
            <SendQRCodeToAll />

            <AttendeeList
              attendees={attendees}
              fetchAndSetAttendees={fetchAndSetAttendees}
            />
          </AccordionDetails>
        </Accordion>
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
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
