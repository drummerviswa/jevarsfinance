import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers:{
    Authorization:"Bearer secretkey"
  }
});
makeRequest.interceptors.response.use(function(response) {
  return response;
})