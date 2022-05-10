import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [logged, setLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const baseURL = process.env.REACT_APP_API_URL;
  const base = axios.create({ baseURL });

  const navigate = useNavigate();

  useEffect(() => {
    const hasJwt = localStorage.getItem("jwt");
    setLogged(Boolean(hasJwt));
    if (hasJwt) {
      getCurrentUser();
    }
  }, [logged]);

  console.log(currentUser);

  function disconnect() {
    navigate("/");
    setLogged(false);
    localStorage.removeItem("jwt");
  }

  const getCurrentUser = () => {
    const token = localStorage.getItem("jwt");
    return base
      .get(`/admins`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setCurrentUser(res.data);
      });
  };

  const value = { logged, setLogged, disconnect, currentUser, setCurrentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
