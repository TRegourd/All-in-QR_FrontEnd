import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { FaMoneyCheckAlt } from "react-icons/fa";

export default function Revenue({ attendees, activities }) {
  const [allActivities, setAllActivities] = useState(activities);
  const [allExtraActivities, setAllExtraActivities] = useState([]);
  const [defaultActivities, setDefaultActivities] = useState([]);

  const [CA, setCA] = useState(null);

  let checkout;

  function fetchAllExtraActivities() {
    setAllExtraActivities(
      attendees.map((attendee) => {
        return attendee.extra_activities;
      })
    );
  }

  function fetchDefaultActivities() {
    setDefaultActivities(
      allActivities.filter((activity) => {
        return attendees.some((attendee) => {
          return activity.role === null
            ? ""
            : activity.role._id === attendee.role._id;
        });
      })
    );
  }

  function fetchCA() {
    checkout = defaultActivities.concat(allExtraActivities).flat();

    setCA(
      checkout.reduce(
        (total, currentValue) => (total = total + currentValue.price),
        0
      )
    );
  }

  useEffect(() => {
    fetchAllExtraActivities();
    fetchDefaultActivities();
  }, []);

  useEffect(() => {
    fetchCA();
  }, [defaultActivities, allExtraActivities]);

  return (
    <Typography
      variant="body1"
      component="div"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        justifyContent: "center",
      }}
    >
      <FaMoneyCheckAlt />
      <span>Forecast Turnover: {CA} €</span>
    </Typography>
  );
}
