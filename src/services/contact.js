import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const base = axios.create({ baseURL });

const contactServices = {
  createNewMessage(body) {
    console.log(body);
    return base.post("/contact", body);
  },
};
export default contactServices;
