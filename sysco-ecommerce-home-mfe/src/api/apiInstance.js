import config from "../config/config.json";

export const productApiInstance = axios.create({
  baseURL: `${config.productServiceBaseURL}/api/v1`,
});
