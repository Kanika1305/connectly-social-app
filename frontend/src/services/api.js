import axios from "axios";

const API = axios.create({
  baseURL: "https://connectly-backend-l4i2.onrender.com/api",
});

export default API;