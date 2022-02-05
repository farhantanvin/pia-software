import axios from "axios";
//const token = localStorage.getItem("x-access-token");

export default axios.create({
  baseURL: "https://localhost:44381",
  //method: 'POST',
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
    //Authorization: `Bearer ${token}`,
    responseType: "json",
  },
});
