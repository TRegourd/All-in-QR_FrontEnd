import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const base = axios.create({ baseURL });

const eventServices = {
  getEventList() {
    const token = localStorage.getItem("jwt");
    return base
      .get("/events", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.data);
  },

  getOneEvent(id) {
    return base.get("/events/" + id).then((res) => res.data);
  },

  modifyOneEvent(id, body) {
    return base.put(`/events/${id}`, body);
  },
};

export default eventServices;
