import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [logged, setLogged] = useState(false);

  const value = { logged, setLogged };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
