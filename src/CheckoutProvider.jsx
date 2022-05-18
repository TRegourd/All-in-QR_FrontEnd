import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ActivitiesServices from "./services/activities";

export const CheckoutContext = createContext(null);

export default function CheckoutProvider({ children }) {
  const baseURL = process.env.REACT_APP_API_URL;
  const base = axios.create({ baseURL });

  const [total, setTotal] = useState(0);

  const [defaultActivities, setDefaultAcitivites] = useState();

  const [extraActivities, setExtraActivities] = useState([]);

  const [checkoutBody, setCheckoutBody] = useState([]);

  let checkout = defaultActivities?.concat(extraActivities);

  let checkoutTotal = 0;

  checkout?.map((item) => {
    checkoutTotal += Number(item.price);
  });

  useEffect(() => {
    setTotal(checkoutTotal);
  }, [checkoutTotal]);

  const value = {
    total,
    setTotal,
    defaultActivities,
    setDefaultAcitivites,
    extraActivities,
    setExtraActivities,
    checkoutBody,
    setCheckoutBody,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}