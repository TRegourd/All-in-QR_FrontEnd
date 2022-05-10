import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const base = axios.create({ baseURL });

const eventServices = {
  getEventList() {
    return base.get("/events").then((res) => res.data);
  },

  getOneEvent(id) {
    return base.get("/events/" + id).then((res) => res.data);
  },
};

export default eventServices;
