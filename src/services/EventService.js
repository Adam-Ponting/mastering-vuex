import axios from "axios";

const apiClient = axios.create({
  // create single axios instance for entire app
  baseURL: "http://localhost:3000", // base URL to call
  withCredentials: false,
  headers: {
    // authentication and configuration
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});
export default {
  getEvents() {
    return apiClient.get("/events"); // calls baseURL/events
  },
  getEvent(id) {
    return apiClient.get("/events/" + id); // get event id with id as prop from EventShow
  }
};
/*   
  npm install -g json-server
  Now to spin up this little API server we just run:
  json-server --watch db.json 
  */
