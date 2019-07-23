import axios from 'axios'

const apiClient = axios.create({
  // create single axios instance for entire app
  baseURL: 'http://localhost:3000', // base URL to call
  withCredentials: false, // this is the default
  headers: {
    // authentication and configuration
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
export default {
  /*   getEvents() {
    // get all events
    return apiClient.get('/events') // calls baseURL/events
  },
 */

  getEvents(perPage, page) {
    // get all events
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page) // calls baseURL/events
  },
  getEvent(id) {
    // get one event
    return apiClient.get('/events/' + id) // get event id with id as prop from EventShow
  },
  postEvent(event) {
    // posts event
    return apiClient.post('/events', event)
  }
}
/*   
  npm install -g json-server
  Now to spin up this little API server we just run:
  json-server --watch db.json 
  */
