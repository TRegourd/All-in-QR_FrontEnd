import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const base = axios.create({ baseURL });

const RolesServices = {
  createRoles(body) {
    const token = localStorage.getItem("jwt");
    return base.post("/roles", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  listRoles(id) {
    const token = localStorage.getItem("jwt");
    return base.get(`/roles/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  modifyRoles(id, body) {
    const token = localStorage.getItem("jwt");
    return base.put(`/roles/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  deleteRole(body) {
    const token = localStorage.getItem("jwt");
    return base.post("/roles/delete", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default RolesServices;
