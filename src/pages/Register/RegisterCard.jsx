import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { BsFillCartCheckFill } from "react-icons/bs";

export default function RegisterCard({
  total,
  defaultActivities,
  extraActivities,
}) {
  return (
    <div>
      <Card>
        <CardContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <CardMedia>
            <BsFillCartCheckFill></BsFillCartCheckFill>
          </CardMedia>
          <Typography variant="body2">
            {" "}
            <ul>
              {defaultActivities.map((activity) => {
                return (
                  <li>
                    {activity.name} {activity.price}€
                  </li>
                );
              })}
            </ul>
            <ul>
              {extraActivities.map((activity) => {
                return (
                  <li>
                    {activity.name} {activity.price}€
                  </li>
                );
              })}
            </ul>
          </Typography>
          <Typography variant="body1">
            Total attendance amount : {total}€
          </Typography>
        </CardContent>

        <CardActions></CardActions>
      </Card>
    </div>
  );
}
