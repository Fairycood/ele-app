<template>
  <div class="shop" v-if="data">
    <!-- 头部 -->
    <nav class="header-nav">
      <div class="nav_bg">
        <img :src="data.rst.scheme" alt="" />
      </div>
      <div class="nav_back">
        <button @click="$router.push('/home')">
          <i class="fa fa-chevron-left"></i>
        </button>
      </div>
      <div class="shop_image">
        <img :src="data.rst.image_path" alt="" />
      </div>
    </nav>
    <!-- 商家信息 -->
    <div class="index-rst">
      <!-- 商家标题 -->
      <div class="rst-name" @click="showInfoModel = true">
        <span>{{ data.rst.name }}</span>
        <i class="fa fa-caret-right"></i>
      </div>
      <!-- 弹窗信息 -->
      <info-model
        v-if="showInfoModel"
        :rst="data.rst"
        :showInfoModel="showInfoModel"
        @close="showInfoModel = false"
      ></info-model>
      <!-- 评分月售 -->
      <div class="rst-order">
        <span>评分{{ data.rst.rating }}</span>
        <span>月售{{ data.rst.recent_order_num }}单</span>
        <span>蜂鸟专送约{{ data.rst.order_lead_time }}分钟</span>
      </div>
      <!-- 优惠信息 -->
      <activity :activities="data.rst.activities"></activity>
      <!-- 公告 -->
      <p class="rst-promotion">公告: {{ data.rst.promotion_info }}</p>
    </div>
    <!-- 点餐，评价，商家的内容 -->
    <navbar />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
//导入网络模块
import { request } from "network/request.js";
//导入子组件
import InfoModel from "./childComp/InfoModel.vue";
import Activity from "./childComp/Activity.vue";
import Navbar from "./childComp/Navbar.vue";

export default {
  name: "Shop",
  data() {
    return {
      data: null, //存储商品的数据
      showInfoModel: false, //是否显示弹窗信息
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      request("/profile/batch_shop").then((res) => {
        console.log(res.data);
        this.data = res.data;
      });
    },
  },
  components: { InfoModel, Activity, Navbar },
};
</script>

<style scoped>
.shop {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header-nav {
  position: relative;
}
.nav_bg img {
  width: 100%;
  height: 26.666667vw;
}
.nav_back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 26.666667vw;
  background: rgba(0, 0, 0, 0.5);
}
.nav_back button {
  background-color: transparent;
  border: 0;
  box-shadow: none;
  color: inherit;
  display: inline-block;
  /* padding: 0; */
  /* margin-left: 1.333333vw; */
  margin-top: 1.333333vw;
}
.nav_back i {
  color: #fff;
  font-size: 1.3rem;
}
.shop_image {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -10vw;
  margin-top: 11vw;
}
.shop_image img {
  width: 20vw;
  height: 20vw;
  border-radius: 0.8vw;
}

.index-rst {
  padding: 8vw 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  box-shadow: inset 0 -0.666667vw 0.666667vw hsla;
}
.index-rst .rst-name {
  flex: 1;
  width: 72vw;
  font-size: 1.3rem;
  font-weight: 700;
  white-space: nowrap;
  padding-right: 2.666667vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.6vw 0;
}
.rst-name span {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
}

.index-rst .rst-order {
  white-space: nowrap;
  height: 3.2vw;
  margin-top: 1.733333vw;
  color: #666;
  text-align: center;
  font-size: 0.6rem;
}
.rst-order span {
  margin: 0 3px;
}
.index-rst .rst-promotion {
  width: 80vw;
  font-size: 0.6rem;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 2.266667vw auto 2.666667vw;
  padding: 0;
  white-space: nowrap;
}
</style>
