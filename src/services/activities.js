import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const base = axios.create({ baseURL });

const ActivitiesServices = {
  createActivities(body) {
    const token = localStorage.getItem("jwt");
    return (
      base.post("/activities", body),
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },

  listActivities(id) {
    const token = localStorage.getItem("jwt");
    return base.get(`/activities/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  listActivitiesByRole(id) {
    const token = localStorage.getItem("jwt");
    return base.post(`/activities/byRole`, id, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  deleteActivities(body) {
    const token = localStorage.getItem("jwt");
    return base.post(`/activities/delete`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  modifyActivities(id, body) {
    const token = localStorage.getItem("jwt");
    return base.put(`/activities/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default ActivitiesServices;
