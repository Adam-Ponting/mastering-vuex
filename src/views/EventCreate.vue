<template>
  <div>
    <h1>Create an Event {{ user.name }}</h1>
    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <h3>Name & describe your event</h3>
      <div class="field">
        <label>Title</label>
        <input
          v-model="event.title"
          type="text"
          placeholder="Add an event title"
        />
      </div>
      <div class="field">
        <label>Description</label>
        <input
          v-model="event.description"
          type="text"
          placeholder="Add a description"
        />
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <input
          v-model="event.location"
          type="text"
          placeholder="Add a location"
        />
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
    <!--  -->
    <p>categories: {{ categories }}</p>
    <p>user: {{ user }}</p>
    <p>Cat length: {{ catLength }}</p>
    <p>Access state via getters: {{ useGetter }}</p>
    <p>Use a getter in a getter: {{ getterInGetter }}</p>
    <!--  -->
    <p>getEvent {{ getEvent(2) }}</p>
    <p>getEvent {{ getEventByID(4) }}</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex' // to allow importing objects
import { mapGetters } from 'vuex' // import getters
import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.createFreshEvent(), // gets the returned data from method
      times, // times: times,
      categories: this.$store.state.categories
    }
  },
  methods: {
    createEvent() {
      this.$store.dispatch('createEvent', this.event).then(() => {
        this.$router.push({ name: 'event-show', params: { id: this.event.id } }) // route to new screen and pass in id as params
        this.event = this.createFreshEvent() // clears out user input on successful submit
      })
    },
    createFreshEvent() {
      const user = this.$store.state.user
      const id = Math.floor(Math.random() * 10000000) // random id
      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  },
  computed: {
    ...mapGetters(['getEventByID']), // import getters
    getEvent() {
      // get event from array by id, which is passed in as an argument(2)
      return this.$store.getters.getEventByID
    },
    useGetter() {
      return this.$store.getters.doneTodos
    },
    getterInGetter() {
      return this.$store.getters.activeTodos
    },
    catLength() {
      // efficient way of getting store state if used in multiple components
      return this.$store.getters.catLength
    },
    ...mapState([
      //'categories',
      'user'
    ]) // use ...object spread operator to add additional computed properties
  }
  /* // get cat array length
  computed:{
    catLength() {
      return this.$store.state.categories.length
    },
  }
 */

  /* 
  computed: mapState({
    user: 'user', // can bind using 'stringName' if accessing top level state here (can use .notation once its bound, ie above in html)
    categories: 'categories'
  })
 */
  /* // can access state individually => 
  computed: {
      userName() {
        return this.$store.state.user.name
      }
    }
 */

  /* // using mapState 
  computed: mapState({
      userName: state => state.user.name,
      categories: state => state.categories
    }) 
    */

  /* // using mapState to access to level state (no dot.notation in store)
  computed: mapState({
      user: 'user',
      categories: 'categories'
    }) 
    */

  /* // using mapState to pass an Array of Strings
  computed: mapState(['categories', 'user']) 
    */
}
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 24px;
}
</style>
