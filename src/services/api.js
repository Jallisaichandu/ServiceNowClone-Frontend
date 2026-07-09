/*import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080"
});
API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
export default API;*/
import axios from "axios";

const API = axios.create({
  baseURL: "https://servicenowclone-backend-production.up.railway.app"
});

API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    console.log("TOKEN FROM LOCALSTORAGE:", token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Authorization Header Added");
    } else {
        console.log("No Token Found");
    }

    return config;
});

export default API;