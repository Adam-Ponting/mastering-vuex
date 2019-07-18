<template>
  <div class="icon-wrapper">
    <svg class="icon" :width="width" :height="height">
      <use v-bind="{ 'xlink:href': '/feather-sprite.svg#' + name }" />
    </svg>
    <!-- defauly slot -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    },
    width: {
      type: [Number, String], // can be number or string
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 1rem;
  font-weight: 600;
}
.icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  margin-right: 6px;
}
</style>
