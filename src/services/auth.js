import axios from "axios";

const baseURL = "http://localhost:1337";

const base = axios.create({ baseURL });

const authServices = {
  login(body) {
    // email, password
    return base.post("/auth/login", body);
  },

  signin(body) {
    return base.post("/auth/signin", body);
  },

  createEvent(body) {
    console.log(baseURL);
    return base.post("/events", body);
  },
};

export default authServices;
