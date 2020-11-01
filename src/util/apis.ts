import axios from "axios";
import config from "../config";

const API = {
  api123milhas: axios.create({
    baseURL: config.api123Milhas,
  }),
};

export default API;
