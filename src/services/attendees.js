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

  getOneAttendeeByEmail(body) {
    return base.post(`/attendees/email`, body);
  },

  modifyAttendee(id, body) {
    return base.put(`/attendees/${id}`, body);
  },
  deleteAttendee(body) {
    return base.post(`/attendees/delete`, body);
  },

  deleteRole(id) {
    return base.delete(`/roles/${id}`);
  },
  sendQrCodeEmail(id) {
    return base.post(`/qrcode/${id}`);
  },

  sendQrCodeEmailToEveryone(body) {
    return base.post(`/qrcode/many/`, body);
  },

  sendRegisterEmail(body) {
    return base.post(`/register`, body);
  },
};

export default AttendeesServices;
