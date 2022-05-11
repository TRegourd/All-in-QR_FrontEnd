import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

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
    return base.put(`/auth/reset/${id}`, body);
  },

  getCurrentUser() {
    const token = localStorage.getItem("jwt");
    return base
      .get(`/admins`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.data);
  },

  editCurrentUser(body) {
    const token = localStorage.getItem("jwt");
    return base.put(`/admins`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
export default authServices;
