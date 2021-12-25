<template>
  <div class="city">
    <div class="search_wrap">
      <div class="search">
        <i class="icon ion-ios-search"></i>
        <input
          type="text"
          placeholder="输入城市名或者拼音"
          v-model="city_val"
        />
      </div>
      <button
        @click="$router.push({ name: 'address', params: { city: city } })"
      >
        取消
      </button>
    </div>
    <div v-if="searchList.length == 0" style="height: 100%">
      <div class="location">
        <location :location="city"></location>
      </div>
      <alphabet
        @selectCity="selectCity"
        ref="allCity"
        :cityInfo="cityInfo"
        :keys="keys"
      ></alphabet>
    </div>
    <div class="search_list" v-else>
      <ul>
        <li
          v-for="(item, index) in searchList"
          :key="index"
          @click="selectCity(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//引入公共组件;
import Location from "components/content/Location.vue";
//引入子组件
import Alphabet from "./childComp/Alphabet.vue";

//引入网络模块;
import { request } from "network/request.js";

export default {
  name: "City",
  data() {
    return {
      city_val: "", //搜索框的值
      cityInfo: null, //所有城市的信息列表
      keys: [], //字母索引
      allCities: [], //保存所有城市，用于搜索时过滤
      searchList: [], //存储跟用户输入词向匹配的城市列表
    };
  },
  computed: {
    city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      );
    },
  },
  watch: {
    //监听搜索框的输入，列出相关的城市
    city_val() {
      this.searchCity();
    },
  },
  created() {
    this.getCityInfo();
  },
  methods: {
    //获取城市列表
    getCityInfo() {
      request("/posts/cities")
        .then((res) => {
          this.cityInfo = res.data;
          this.keys = Object.keys(res.data);
          this.keys.pop();
          this.keys.sort();
          //让城市内容列表可以滚动
          this.$nextTick(() => {
            this.$refs.allCity.initScroll();
          });
          //保存所有城市，用于搜索的时候过滤
          this.keys.forEach((key) => {
            this.cityInfo[key].forEach((city) => {
              this.allCities.push(city);
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //把当前定位的城市改成用户所选择的城市
    selectCity(city) {
      this.$router.push({ name: "address", params: { city: city.name } });
    },
    //把与用户输入词相关联的城市列表保存到searchList
    searchCity() {
      if (!this.city_val) {
        this.searchList = [];
      } else {
        this.searchList = this.allCities.filter((item) => {
          return item.name.indexOf(this.city_val) != -1;
        });
      }
    },
  },
  components: {
    Location,
    Alphabet,
  },
};
</script>

<style scoped>
.city {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}
.search_wrap {
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 3px 16px;
  display: flex;
  justify-content: space-between;
}
.search {
  background-color: #eee;
  border-radius: 10px;
  line-height: 40px;
  width: 85%;
  box-sizing: border-box;
  padding: 0 16px;
}
.search input {
  background: #eee;
  outline: none;
  border: none;
  margin-left: 5px;
}
.search_wrap button {
  background: #fff;
  border: none;
  outline: none;
  color: #009eef;
}

.location {
  background: #fff;
  padding: 8px 16px;
  height: 65px;
  box-sizing: border-box;
}

.search_list {
  background: #fff;
  padding: 5px 16px;
}
.search_list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
