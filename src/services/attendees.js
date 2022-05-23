import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const base = axios.create({ baseURL });

const AttendeesServices = {
  createAttendees(body) {
    const token = localStorage.getItem("jwt");
    return base.post("/attendees", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getAttendeesList(id) {
    const token = localStorage.getItem("jwt");
    return base
      .get("/attendees/event/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  getOneAttendee(id) {
    const token = localStorage.getItem("jwt");
    return base.get(`/attendees/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getOneAttendeeByEmail(body) {
    const token = localStorage.getItem("jwt");
    return base.post(`/attendees/email`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  modifyAttendee(id, body) {
    const token = localStorage.getItem("jwt");
    return base.put(`/attendees/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  deleteAttendee(body) {
    const token = localStorage.getItem("jwt");
    return base.post(`/attendees/delete`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  deleteRole(id) {
    const token = localStorage.getItem("jwt");
    return base.delete(`/roles/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  sendQrCodeEmail(id) {
    const token = localStorage.getItem("jwt");
    return base.post(`/qrcode/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  sendQrCodeEmailToEveryone(body) {
    const token = localStorage.getItem("jwt");
    return base.post(`/qrcode/many/`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  sendRegisterEmail(body) {
    const token = localStorage.getItem("jwt");
    return base.post(`/register`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default AttendeesServices;
