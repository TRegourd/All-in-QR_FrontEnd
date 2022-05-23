import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const base = axios.create({ baseURL });

const eventServices = {
  getEventList() {
    const token = localStorage.getItem("jwt");
    return base
      .get("/events", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  getAllEventList() {
    return base.get("/events/home/all").then((res) => res.data);
  },

  getOneEvent(id) {
    const token = localStorage.getItem("jwt");
    return base
      .get("/events/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  modifyOneEvent(id, body) {
    const token = localStorage.getItem("jwt");
    return base.put(`/events/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  addTurnover(id, body) {
    return base.put(`/events/${id}/sum`, body);
  },

  deleteOneEvent(id) {
    return base.delete("/events/" + id).then((res) => console.log(res));
  },
};

export default eventServices;
