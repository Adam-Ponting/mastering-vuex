<template>
  <div>
    <h1>Events Listing</h1>
    <!-- v-for events array, pass in event as prop to each event-card -->
    <event-card v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js' // import axios calls

/* not needed
import axios from 'axios' // import axios
 */
export default {
  components: {
    EventCard
  },
  data() {
    return {
      events: []
    }
  },
  created() {
    EventService.getEvents() // call getEvents() in EventService
      .then(response => {
        //  console.log('response =>', response)
        console.log('getEvents() response.data =>', response.data) // shows data
        this.events = response.data
      })
      .catch(error => {
        // console.log('There was an error =>', error) // logs error (not great)
        console.log('getEvents() error.response =>', error.response) // logs error in details (good)
      })

    /* // not worth doing axios calls in components as creates multiple instances
    axios
      .get('http://localhost:3000/events') // get request
      .then(response => {
        console.log('response =>', response)
        console.log('response.data =>', response.data) // shows data
        this.events = response.data
      })
      .catch(error => {
        console.log('There was an error =>', error) // logs error (not great)
        console.log('There was an error.response =>', error.response) // logs error in details (good)
      })
 */
  }
}
</script>

<style lang="scss" scoped></style>
