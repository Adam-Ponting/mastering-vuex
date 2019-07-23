<template>
  <div>
    <h1>Events Listing</h1>
    <!-- v-for events array, pass in event as prop to each event-card -->
    <event-card v-for="event in events" :key="event.id" :event="event" />
    <!-- only show if not on page 1 -->
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page</router-link
      >|
    </template>
    <!-- only show if not on last page -->
    <template v-if="this.eventsTotal > this.page * 3">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }"
        >Next Page</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

/* not needed
import axios from 'axios' // import axios
 */
export default {
  components: {
    EventCard
  },
  created() {
    this.$store.dispatch('fetchEvents', {
      perPage: 3, // show 3 items per page
      page: this.page // bound to page computed property
    }) // call action to get events
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
  },
  computed: {
    eventsTotal() {
      // get the total number of events from store
      return this.$store.state.eventsTotal
    },
    page() {
      return parseInt(this.$route.query.page || 1) // if no url params, use 1
    },
    ...mapState(['events']) // get access to state
  }
}
</script>

<style lang="scss" scoped></style>
