import AttendeesServices from "../../services/attendees";
import Attendee from "../Attendee/Attendee";

function AttendeeList({ attendees }) {
  return (
    <section>
      <h2>Liste des participants</h2>
      <div>
        {attendees?.map((result) => {
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
