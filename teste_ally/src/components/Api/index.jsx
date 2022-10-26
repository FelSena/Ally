import axios from "axios";

const BASE_URL = "https://amazon-api.sellead.com/";

const API = axios.create({
  baseURL: BASE_URL,
});

export default API;
