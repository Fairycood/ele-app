<template>
  <div class="pay">
    <ele-header
      backUrl="settlement"
      :isBack="true"
      title="在线支付"
    ></ele-header>
    <!-- 支付剩余时间提示 -->
    <div class="main" v-if="orderInfo">
      <div class="tip">
        <p class="countdown-title">支付剩余时间</p>
        <h3 class="countdown-text">{{ countDown }}</h3>
      </div>
      <section class="home">
        <!-- 要支付商品的信息 -->
        <ul class="list info-list">
          <li>
            <span class="order-name">{{ orderInfo.shopInfo.name }}</span>
            <span class="text-highlight">¥{{ totalPrice }}</span>
          </li>
        </ul>
        <!-- 支付方式 -->
        <div class="title">在线支付</div>
        <ul class="list payment-list">
          <li class="payment-list-item">
            <div class="icon">
              <img src="../../assets/img/wechart.jpg" alt />
              <span>微信</span>
            </div>
            <i class="fa fa-check-circle selected"></i>
          </li>
        </ul>
      </section>
      <button :disabled="timeOut" class="btn-submit" @click="pay">
        确认支付
      </button>
    </div>
  </div>
</template>

<script>
import EleHeader from "../../components/content/EleHeader.vue";
export default {
  name: "Pay",
  data() {
    return {
      countDown: "00:15:00", //订单剩余时间
      timer: null, //计时器
      timeOut: false, //订单是否已经超时
    };
  },
  computed: {
    orderInfo() {
      return this.$store.getters.orderInfo;
    },
    totalPrice() {
      return this.$store.getters.totalPrice;
    },
    userInfo() {
      return this.$store.getters.userInfo;
    },
    remarkInfo() {
      return this.$store.getters.remarkInfo;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.countTimeDown();
    });
  },
  methods: {
    //倒计时
    countTimeDown() {
      let minute = 14;
      let second = 60;
      this.timer = setInterval(() => {
        second--;
        if (minute == 0 && second == 0) {
          this.countDown = "订单已超时";
          clearInterval(this.timer);
          this.timeOut = true;
          return;
        }
        if (second < 10) {
          second = "0" + second;
          if (second == 0) {
            second = 59;
            minute--;
            if (minute < 10) {
              minute = "0" + minute;
            }
          }
        }
        this.countDown = "00:" + minute + ":" + second;
      }, 1000);
    },
    //点击支付,将订单相关信息保存到vuex
    pay() {
      clearInterval(this.timer);
      const myDate = new Date();
      let time = myDate.toLocaleTimeString();
      let order = {
        time: time,
        orderInfo: this.$store.getters.orderInfo,
        totalPrice: this.$store.getters.totalPrice,
      };
      this.$store.commit("ORDER_LIST", order);
      this.$router.push("/order");
    },
  },
  components: { EleHeader },
};
</script>

<style scoped>
.pay {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
}

.main {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.tip {
  display: block;
  text-align: center;
  background-color: #fff;
  color: #333;
  padding: 2rem;
  line-height: 2rem;
}
countdown-title {
  font-size: 0.88rem;
  color: #999;
}
.countdown-text {
  height: 2rem;
  color: #333;
  font-size: 1.8rem;
}
down-text {
  height: 2rem;
  color: #333;
  font-size: 1.8rem;
}
.list {
  border-bottom: 0.5px solid #eee;
  background: #fff;
}
.info-list {
  padding: 0 1.5rem;
}
.info-list li {
  border-top: 0.5px solid #eee;
  display: flex;
  padding: 1.5rem 0;
  font-size: 1rem;
  line-height: 1rem;
  justify-content: space-between;
}
.info-list li .order-name {
  color: #333;
  display: inline-block;
  vertical-align: bottom;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 16px;
  max-width: 60%;
}
.text-highlight {
  color: #ff6000;
}
.title {
  background-color: #f5f5f5;
  font-size: 0.88rem;
  padding: 1.2rem 1.2rem 1rem;
  color: #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.payment-list-item {
  border-bottom: 0.5px solid #eee;
  padding: 0.9rem 1rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.icon {
  display: flex;
  align-items: center;
}
.payment-list-item img {
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 20px;
}
.payment-list-item > i {
  font-size: 1.5rem;
  color: #eee;
}
.selected {
  color: #4cd964 !important;
}
.btn-submit-wrap {
  margin: 1rem auto;
  width: 90%;
}
.btn-submit {
  font-size: 1.1rem;
  line-height: 1.5rem;
  background-color: #4cd964;
  width: 100%;
  outline: none;
  border: none;
  color: #fff;
  border-radius: 5px;
  padding: 0.5rem;
  box-sizing: border-box;
}

/* 不可点击btn */
.btn-submit[disabled] {
  background-color: #bbb !important;
}
</style>
