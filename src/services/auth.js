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
    return base.post("/events", body);
  },
  forgot(body) {
    return base.post("/auth/forgot", body);
  },

  reset(body, id) {
    console.log(id);
    return base.put(`/auth/reset/${id}`, body);
  },
};
export default authServices;
