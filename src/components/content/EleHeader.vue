<template>
  <div class="header">
    <!-- 左上角的返回按钮 -->
    <div class="back" v-show="isBack">
      <i class="icon ion-ios-arrow-back"></i>
      <button @click="$router.push({ name: backUrl })">返回</button>
    </div>
    <!-- 中间的标题 -->
    <h1 class="title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "EleHeader",
  props: {
    title: String,
    isBack: {
      type: Boolean,
      default: false,
    },
    backUrl: String,
  },
  data() {
    return {};
  },
  methods: {},
  components: {},
};
</script>

<style scoped>
.header {
  align-items: center;
  background-color: #009eef;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  font-size: 16px;
  line-height: 1;
  padding: 0 10px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  position: fixed;
  height: 45px;
  width: 100%;
  top: 0;
  z-index: 99;
}
.back {
  position: inherit;
  text-align: left;
}
.back button {
  margin-left: 4px;
  background-color: transparent;
  border: 0;
  box-shadow: none;
  color: inherit;
  display: inline-block;
  padding: 0;
  font-size: inherit;
  outline: none;
}
.title {
  flex: 1;
}
</style>
