<template>
  <div class="search">
    <!-- 顶部标题 -->
    <ele-header :isBack="true" title="搜索" backUrl="home"></ele-header>
    <!-- 搜索栏 -->
    <div class="search_header">
      <form class="search_wrap">
        <i class="fa fa-search"></i>
        <input
          type="text"
          v-model="key_word"
          placeholder="请输入要搜索的商家"
        />
        <button @click.prevent="searchHandle">搜索</button>
      </form>
    </div>
    <div class="shop" v-if="result && !showShop">
      <!-- 找不出搜索结果 -->
      <div class="empty_wrap" v-if="isEmpty">
        <img
          src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png"
          alt=""
        />
        <div class="empty_txt">
          <h4>附近没有搜索结果</h4>
          <span>换个关键词试试吧</span>
        </div>
      </div>
      <!-- 商品图例列表 -->
      <div v-else>
        <search-index
          :data="result.restaurants"
          @itemClick="shopItemClick"
        ></search-index>
        <search-index
          :data="result.words"
          @itemClick="shopItemClick"
        ></search-index>
      </div>
    </div>
    <!-- 商家信息 -->
    <div class="container" v-if="showShop">
      <!-- 导航栏 -->
      <filterView :filterData="filterData" @update="update"></filterView>
      <!-- 商家列表 -->
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
        <index-shop
          v-for="(item, index) in restaurants"
          :key="index"
          :restaurant="item.restaurant"
        />
      </ul>
    </div>
  </div>
</template>

<script>
//组件
import EleHeader from "components/content/EleHeader.vue";
import SearchIndex from "./childComp/SearchIndex.vue";
import IndexShop from "../../components/content/IndexShop.vue";
import FilterView from "../../components/content/FilterView.vue";
import { InfiniteScroll } from "mint-ui";

//网络模块
import { request } from "network/request.js";

export default {
  name: "Search",
  data() {
    return {
      key_word: "", //搜索框里的关键字
      result: null, //根据关键字所获取的搜索结果数据
      isEmpty: false, //是否有搜索结果
      showShop: false, //是否显示商家信息
      filterData: null, //导航栏的数据
      page: 0, //加载哪一页的商家列表
      size: 7, //一次加载多少个商家
      loading: false, //是否加载完
      restaurants: [], //存储商品列表数据
      data: null, //筛选条件
    };
  },
  created() {
    //获取导航栏的数据
    request("/profile/filter").then((res) => {
      // console.log(res);
      this.filterData = res.data;
    });
  },
  watch: {
    key_word() {
      this.isEmpty = false;
      this.showShop = false;
      this.keyChange();
    },
  },
  methods: {
    //根据搜索框的关键词获取相关商家的数据信息
    keyChange() {
      request(`/profile/typeahead/${this.key_word}`)
        .then((res) => {
          // console.log(res);
          this.result = res.data;
        })
        .catch((err) => {
          this.result = null;
        });
    },
    //点击搜索栏的搜索按钮
    searchHandle() {
      if (!this.key_word) return;
      if (
        this.result &&
        (this.result.restaurants.length > 0 || this.result.words.length > 0)
      )
        this.showShop = true;
      else this.isEmpty = true;
    },
    //点击对应的li显示出对应的商家信息
    shopItemClick() {
      this.page = 0;
      this.restaurants = [];
      this.showShop = true;
    },
    //根据筛选条件刷新商品列表
    update(condation) {
      // console.log(condation);
      this.data = condation;
      this.shopItemClick();
      this.loadMore();
    },
    //下拉商家信息列表自动刷新
    loadMore() {
      this.page++;
      request({
        url: `/profile/restaurants/${this.page}/${this.size}`,
        method: "post",
        data: this.data,
      }).then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          res.data.forEach((item) => {
            this.restaurants.push(item);
          });
        } else {
          this.loading = true;
        }
      });
    },
  },
  components: {
    EleHeader,
    SearchIndex,
    IndexShop,
    FilterView,
    InfiniteScroll,
  },
};
</script>

<style scoped>
.search {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.search_header {
  margin-top: 45px;
  background: #fff;
  padding: 0 4.266667vw;
}
.search_header .search_wrap {
  padding: 2.933333vw 2.933333vw 2.933333vw 0;
  display: flex;
  align-items: center;
  position: relative;
}
.search_wrap .fa-search {
  width: 2.933333vw;
  height: 2.933333vw;
  color: #888;
  position: absolute;
  top: 4.6666666vw;
  left: 2.933333vw;
}
.search_wrap input {
  flex-grow: 1;
  border-radius: 0.266667vw;
  background-color: #f8f8f8;
  padding: 1.733333vw 4vw 1.733333vw 8.8vw;
  color: #666;
  outline: none;
  border: none;
}
.search_wrap button {
  outline: none;
  border: none;
  color: #333;
  font-size: 0.426667rem;
  background: #fff;
  font-weight: 700;
  margin-left: 2.933333vw;
  font-size: 14px;
}

.shop {
  width: 100%;
  height: calc(100% - 95px);
  overflow: auto;
}

.empty_wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  display: flex;
  justify-content: center;
}
.empty_wrap img {
  width: 35vw;
  height: 35vw;
}
.empty_txt h4 {
  color: #666;
  font-size: 1rem;
  margin: 12vw 0 2vw 0;
}
.empty_txt span {
  color: #999;
  font-size: 0.8rem;
}
</style>
