import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [logged, setLogged] = useState(true);

  const navigate = useNavigate();

  function disconnect() {
    navigate("/");
    setLogged(false);
    //localStorage.removeItem("jwt");
  }

  const value = { logged, setLogged, disconnect };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
