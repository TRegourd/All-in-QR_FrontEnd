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

  deleteActivities(id) {
    return base.delete(`/activities/${id}`);
  },
};

export default ActivitiesServices;
