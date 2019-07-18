<template>
  <div id="nav" class="nav">
    <router-link to="/" class="brand">Real World Events</router-link>
    <nav>
      <!-- create a link to a route-->
      <!-- using named routes is better as the url may change at a later date -->
      <router-link :to="{ name: 'event-list' }">List</router-link>&nbsp;|
      <router-link :to="{ name: 'event-create' }">Create</router-link>&nbsp;|
      <!-- pass 'greg' as username prop -->
      <router-link :to="{ name: 'user', params: { username: 'greg' } }"
        >Props</router-link
      >
    </nav>
  </div>
  <!-- renders the matched link -->
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.nav > .brand {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  color: #39b982;
  text-decoration: none;
}
.nav .nav-item {
  box-sizing: border-box;
  margin: 0 5px;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
}
.nav .nav-item.router-link-exact-active {
  color: #39b982;
  border-bottom: solid 2px #39b982;
}
</style>
