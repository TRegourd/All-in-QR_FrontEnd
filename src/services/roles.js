import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const base = axios.create({ baseURL });

const RolesServices = {
  createRoles(body) {
    return base.post("/roles", body);
  },

  listRoles(id) {
    return base.get(`/roles/${id}`);
  },

  modifyRoles(id, body) {
    return base.put(`/roles/${id}`, body);
  },
  deleteRole(body) {
    return base.post("/roles/delete", body);
  },
};

export default RolesServices;
