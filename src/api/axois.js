import axios from "axios";

const api = axios.create({
  baseURL: "https://google.serper.dev",
  headers: {
    'X-API-KEY': '5d0f9b07054774bc8b8ab1727c60b14c4854bd66', 
    "Content-Type": "application/json",
  },
});

export default api;