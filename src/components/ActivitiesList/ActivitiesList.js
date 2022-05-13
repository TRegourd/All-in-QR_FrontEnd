import { useParams } from "react-router-dom";
import Activities from "../Activities/Activities";
export default function ActivitiesList({ activities, fetchAndSetActivities }) {
  let params = useParams();

  return (
    <div>
      {activities.map((result) => {
        return (
          <div key={result._id}>
            <Activities
              activities={result}
              eventID={params.eventID}
              fetchAndSetActivities={fetchAndSetActivities}
            />
          </div>
        );
      })}
    </div>
  );
}