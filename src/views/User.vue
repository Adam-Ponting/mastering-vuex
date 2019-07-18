<template>
  <div>
    <!-- $route represents the state of the current route -->
    <p>{{ $route.params.username }}</p>
    <!-- username as prop -->

    <p>{{ username }}</p>
    <p>hello</p>
  </div>
</template>

<script>
export default {
  props: {
    username: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped></style>
