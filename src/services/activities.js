import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const base = axios.create({ baseURL });

const ActivitiesServices = {
  createActivities(body) {
    return base.post("/activities", body);
  },

  listActivitieswithID({ body }) {
    return base.post("/activities/get", body);
  },

  listActivities(id) {
    return base.get(`/activities/${id}`);
  },

  deleteActivities(id) {
    return base.delete(`/activities/${id}`);
  },
  modifyActivities(id, body) {
    return base.put(`/activities/${id}`, body);
  },
};

export default ActivitiesServices;
