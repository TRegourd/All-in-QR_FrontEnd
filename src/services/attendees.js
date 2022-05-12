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

  getAttendeesList(id) {
    return base.get("/attendees/event/" + id).then((res) => res.data);
  },

  getOneAttendee(id) {
    return base.get(`/attendees/${id}`);
  },

  modifyAttendee(id, body) {
    return base.put(`/attendees/${id}`, body);
  },
  deleteAttendee(id) {
    return base.delete(`/attendees/${id}`);
  },

  deleteRole(id) {
    return base.delete(`/roles/${id}`);
  },
};

export default AttendeesServices;
