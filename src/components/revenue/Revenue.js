import Typography from "@mui/material/Typography";
import { FaMoneyCheckAlt } from "react-icons/fa";

export default function Revenue({ eventData }) {
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
      <FaMoneyCheckAlt size={"30px"} />
      <span>Turnover : {eventData?.turnover} €</span>
    </Typography>
  );
}
