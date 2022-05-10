import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const base = axios.create({ baseURL });

const AttendeesServices = {
  getRoles() {
    return base.get("/roles");
  },

  getActivities() {
    return base.get("/activities");
  },

  createAttendees(body) {
    return base.post("/attendees", body);
  },
};

export default AttendeesServices;
