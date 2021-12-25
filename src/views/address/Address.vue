<template>
  <div class="address">
    <ele-header title="选择收货地址" :isBack="true" backUrl="home"></ele-header>
    <div class="search">
      <div class="select-city">
        <span class="city" @click="$router.push({ name: 'city' })">
          {{ city }}
          <i class="icon ion-ios-arrow-down"></i>
          |
        </span>
        <i class="icon ion-ios-search"></i>
        <input
          type="text"
          placeholder="请输入你的收获地址"
          v-model="searchVal"
        />
      </div>
      <location :location="location"></location>
    </div>
    <div class="area">
      <ul class="area_list" v-for="(item, index) in tipsArray" :key="index">
        <li @click="selectAddress(item)">
          <h4>{{ item.name }}</h4>
          <p>{{ item.district }}{{ item.address }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import EleHeader from "components/content/EleHeader";
import Location from "components/content/Location.vue";

export default {
  name: "Address",
  data() {
    return {
      city: "",
      searchVal: "",
      tipsArray: [],
    };
  },
  computed: {
    location() {
      return this.$store.getters.location.formattedAddress;
    },
  },
  //展示当前定位所在的城市
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.city = to.params.city;
    });
  },
  //观察搜索栏的变化
  watch: {
    searchVal() {
      this.showPlaca();
    },
  },
  methods: {
    //当用户在搜索框里输入内容时，列出相关地址
    showPlaca() {
      const self = this;
      AMap.plugin("AMap.Autocomplete", function () {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: "全国",
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(self.searchVal, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          console.log(result);
          self.tipsArray = result.tips;
        });
      });
    },
    //把地址给成用户所选的地址
    selectAddress(item) {
      //设置地址
      this.$store.dispatch(
        "setAddress",
        item.name + item.district + item.address
      );
      //跳转到home
      this.$router.push("/home");
    },
  },
  components: {
    EleHeader,
    Location,
  },
};
</script>

<style scoped>
.address {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}

.search {
  background-color: #fff;
  padding: 10px 20px;
  color: #333;
}

.select-city {
  background-color: #eee;
  height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  line-height: 40px;
}
.select-city .city {
  padding: 0 10px;
}
.city i {
  margin-right: 8px;
}
.select-city input {
  margin-left: 5px;
  background-color: #eee;
  outline: none;
  border: none;
}

.area {
  margin-top: 16px;
  background: #fff;
}
.area li {
  border-bottom: 1px solid #eee;
  padding: 8px 16px;
  color: #aaa;
}
.area li h4 {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}
</style>
