import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://amazon-api-deploy-mn3d.onrender.com",
});

export { axiosInstance };
