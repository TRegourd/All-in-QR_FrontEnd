import { useParams } from "react-router-dom";
import Activities from "../Activities/Activities";
export default function ActivitiesList({ activities, fetchAndSet, roles }) {
  let params = useParams();

  return (
    <div>
      {activities.map((result) => {
        return (
          <div key={result._id}>
            <Activities
              activities={result}
              eventID={params.eventID}
              fetchAndSet={fetchAndSet}
              roles={roles}
            />
          </div>
        );
      })}
    </div>
  );
}
