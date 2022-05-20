import { useEffect, useState } from "react";
import AttendeesServices from "../../services/attendees";
import ActivitiesServices from "../../services/activities";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

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
    <Typography variant="body1" component="div">
      Les revenues possibles sont de : {CA} €
    </Typography>
  );
}
