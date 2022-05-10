import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import authServices from "../../services/auth";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState();

  function fetchAndSetUserList() {
    authServices
      .getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => alert("erreur"));
  }

  useEffect(() => {
    fetchAndSetUserList();
    console.log(currentUser);
  }, []);

  return (
    <section>
      <h2>{currentUser && currentUser.name}</h2>
    </section>
  );
}
