import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AttendeesServices from "../../services/attendees";
import Attendee from "../Attendee/Attendee";

function AttendeeList() {
  const [attendees, setAttendees] = useState([]);

  function fetchAndSetAttendees() {
    AttendeesServices.getAttendeesList()
      .then((result) => setAttendees(result))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchAndSetAttendees();
  }, []);

  return (
    <section>
      <h2>Liste des participants</h2>
      <div>
        {attendees.data?.map((result) => {
          return (
            <div>
              <Attendee attendeeInfo={result} key={result._id} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AttendeeList;
