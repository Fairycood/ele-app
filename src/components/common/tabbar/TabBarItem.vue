<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeColor" :class="{ active: isActive }">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    color: {
      type: String,
      default: "rgb(255, 87, 119)",
    },
  },
  data() {
    return {};
  },
  methods: {
    itemClick() {
      return this.$router.replace(this.path);
    },
  },
  computed: {
    isActive() {
      return this.$route.path === this.path;
    },
    activeColor() {
      return this.isActive ? { color: this.color } : {};
    },
  },
  components: {},
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 7px;
  color: #cdcdcd;
}
.tab-bar-item img {
  width: 22px;
  height: 22px;
  vertical-align: middle;
  margin-top: 6px;
  margin-bottom: 3px;
}
</style>
