import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import eventServices from "../../services/Event";
import FormAdd from "../../components/Add_Attendees/FormAdd";

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

  return (
    <section>
      <div>{eventData.name}</div>
      <FormAdd />
    </section>
  );
}

export default EventDetails;
