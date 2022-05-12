import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import eventServices from "../../services/Event";
import FormAdd from "../../components/Add_Attendees/FormAdd";
import AttendeeList from "../../components/AttendeeList/AttendeeList";
import AttendeesServices from "../../services/attendees";
import AddRoles from "../../components/AddRoles/AddRoles";
import RolesServices from "../../services/roles";

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

  const styles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  return (
    <section>
      <div>{eventData.name}</div>
      <div style={styles}>
        <FormAdd fetchAndSetAttendees={fetchAndSetAttendees} roles={roles} />
        <AddRoles fetchAndSetRoles={fetchAndSetRoles} />
      </div>
      <AttendeeList
        attendees={attendees}
        fetchAndSetAttendees={fetchAndSetAttendees}
      />
    </section>
  );
}

export default EventDetails;
