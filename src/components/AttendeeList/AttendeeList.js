import AttendeesServices from "../../services/attendees";
import Attendee from "../Attendee/Attendee";
import { useParams } from "react-router-dom";

function AttendeeList({ attendees }) {
  let params = useParams();

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
