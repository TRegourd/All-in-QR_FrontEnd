import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const base = axios.create({ baseURL });

const paymentServices = {
  intentPayment(body) {
    return base.post(`/register/payment`, body, {
      headers: { "Content-Type": "application/json" },
    });
  },
};
export default paymentServices;
