<template>
  <div>
    <h1>Create an Event {{ user.name }}</h1>
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

export default {
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
    ...mapState(['categories', 'user']) // use ...object spread operator to add additional computed properties
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

<style lang="scss" scoped></style>
