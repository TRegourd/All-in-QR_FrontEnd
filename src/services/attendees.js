import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const base = axios.create({ baseURL });

const AttendeesServices = {
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

  sendQrCodeEmail(id) {
    return base.post(`/qrcode/${id}`);
  },

  sendRegisterEmail(body) {
    return base.post(`/register`, body);
  },
};

export default AttendeesServices;
