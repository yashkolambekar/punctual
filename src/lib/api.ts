import axios from "axios";

let token : string | null = "";

if(typeof window !== "undefined"){
  token = localStorage.getItem("token");
}

const api = axios.create({
  baseURL: "/api/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;