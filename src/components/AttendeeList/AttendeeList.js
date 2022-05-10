import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AttendeesServices from "../../services/attendees";
import Attendee from "../Attendee/Attendee";

function AttendeeList() {
  let params = useParams();

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
    <section>
      <h2>Liste des participants</h2>
      <div>
        {attendees?.map((result) => {
          return (
            <div>
              <Attendee
                attendeeInfo={result}
                eventId={params.eventID}
                key={result._id}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AttendeeList;
