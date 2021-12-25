<template>
  <div class="index">
    <router-view></router-view>
    <ele-tab-bar></ele-tab-bar>
  </div>
</template>

<script>
import EleTabBar from "components/content/EleTabBar.vue";

export default {
  name: "Index",
  data() {
    return {};
  },
  methods: {},
  components: {
    EleTabBar,
  },
};
</script>

<style scoped>
.index {
  width: 100%;
  height: calc(100% - 49px);
}
</style>
