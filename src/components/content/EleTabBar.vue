<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home" color="rgb(18, 150, 219)">
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="" />
        <img
          slot="item-icon-active"
          src="~assets/img/tabbar/home_active.svg"
          alt=""
        />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/order" color="rgb(18, 150, 219)">
        <img slot="item-icon" src="~assets/img/tabbar/order.svg" alt="" />
        <img
          slot="item-icon-active"
          src="~@/assets/img/tabbar/order_active.svg"
          alt=""
        />
        <div slot="item-text">订单</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" color="rgb(18, 150, 219)">
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="" />
        <img
          slot="item-icon-active"
          src="~assets/img/tabbar/profile_active.svg"
          alt=""
        />
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "EleTabBar",
  data() {
    return {};
  },
  methods: {},
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style scoped></style>
