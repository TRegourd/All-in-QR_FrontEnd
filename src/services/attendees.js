import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const base = axios.create({ baseURL });

const AttendeesServices = {
  getRoles() {
    return base.get("/roles");
  },
};

export default AttendeesServices;
