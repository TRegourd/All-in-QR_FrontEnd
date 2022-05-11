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

  deleteOneEvent(id) {
    return base.delete("/events/" + id).then((res) => console.log(res));
  },
};

export default eventServices;
