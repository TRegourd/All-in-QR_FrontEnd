import AttendeesServices from "../../services/attendees";
import Attendee from "../Attendee/Attendee";
import { useParams } from "react-router-dom";

function AttendeeList({ attendees, fetchAndSetAttendees }) {
  let params = useParams();

  return (
    <div>
      {attendees?.map((result) => {
        return (
          <div key={result._id}>
            <Attendee
              attendeeInfo={result}
              eventId={params.eventID}
              fetchAndSetAttendees={fetchAndSetAttendees}
            />
          </div>
        );
      })}
    </div>
  );
}

export default AttendeeList;
