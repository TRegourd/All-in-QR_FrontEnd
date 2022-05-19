import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const base = axios.create({ baseURL });

const ActivitiesServices = {
  createActivities(body) {
    return base.post("/activities", body);
  },

  listActivities(id) {
    return base.get(`/activities/${id}`);
  },

  listActivitiesByRole(id) {
    return base.post(`/activities/byRole`, id);
  },

  deleteActivities(body) {
    return base.post(`/activities/delete`, body);
  },
  modifyActivities(id, body) {
    return base.put(`/activities/${id}`, body);
  },
};

export default ActivitiesServices;
