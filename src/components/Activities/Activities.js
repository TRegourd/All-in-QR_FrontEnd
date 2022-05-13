import DeleteActivities from "../DeleteActivities/DeleteActivities";
import Styled from "styled-components";
import dayjs from "dayjs";
import ModifyActivities from "../ModifyActivities/ModifyActivities";

export default function Activities({
  activities,
  eventID,
  fetchAndSetActivities,
  roles,
}) {
  return (
    <div>
      <ActivitiesStyle>
        <div>{activities.name}</div>
        <div>{dayjs(activities.date).format("LLL")}</div>
        <div>{activities.duration} minutes</div>
        <div>{activities.price} €</div>
        <div>{activities.desc}</div>
        <div>{activities.role !== null ? activities.role.name : ""}</div>
        <div>
          <ModifyActivities
            result={activities}
            eventID={eventID}
            fetchAndSetActivities={fetchAndSetActivities}
            roles={roles}
          />
        </div>
        <div>
          <DeleteActivities
            result={activities}
            eventID={eventID}
            fetchAndSetActivities={fetchAndSetActivities}
          />
        </div>
      </ActivitiesStyle>
    </div>
  );
}

const ActivitiesStyle = Styled.div`
  display: flex;
  margin: 1rem;
  justify-content: space-around;
  padding: 1rem;
  border-radius: 20px;
  align-items: center;
  div {
    width: 100%;
  }
`;
