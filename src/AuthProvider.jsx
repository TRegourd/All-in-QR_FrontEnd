import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [logged, setLogged] = useState(false);
  const baseURL = process.env.REACT_APP_API_URL;
  const base = axios.create({ baseURL });

  const navigate = useNavigate();

  useEffect(() => {
    const hasJwt = localStorage.getItem("jwt");
    setLogged(Boolean(hasJwt));
  }, []);

  function disconnect() {
    navigate("/");
    setLogged(false);
    localStorage.removeItem("jwt");
  }

  const value = { logged, setLogged, disconnect };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
