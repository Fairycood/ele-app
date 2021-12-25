<template>
  <div class="home">
    <!-- 头部的定位 -->
    <div class="header">
      <div
        class="address_map"
        @click="$router.push({ name: 'address', params: { city: city } })"
      >
        <i class="icon ion-location"></i>
        <span>{{ address }}</span>
        <i class="icon ion-android-arrow-dropdown"></i>
      </div>
    </div>
    <!-- 搜索栏 -->
    <div
      class="search_wrap"
      :class="{ fixedview: showFilter }"
      @click="$router.push('/search')"
    >
      <div class="shop_search">
        <i class="icon ion-android-search"></i>
        搜索商家 商家名称
      </div>
    </div>
    <!-- 商品内容部分 -->
    <div class="container">
      <!-- 轮播图 -->
      <swipe :auto="4000" class="swiper">
        <swipe-item v-for="(item, index) in swipeImgs" :key="index">
          <img :src="item" alt="" />
        </swipe-item>
      </swipe>
      <!-- 分类条目栏 -->
      <swipe :auto="0" class="entries">
        <swipe-item v-for="(entry, i) in entries" :key="i">
          <div v-for="(item, index) in entry" :key="index" class="foodentry">
            <div class="img_wrap"><img :src="item.image" alt="" /></div>
            <span>{{ item.name }}</span>
          </div>
        </swipe-item>
      </swipe>
      <!-- 推荐商家 -->
      <div class="shoplist-title">推荐商家</div>
      <!-- 导航栏 -->
      <filterView
        :filterData="filterData"
        @searchFixed="searchFixed"
        @update="update"
      ></filterView>
    </div>
    <!-- 商品列表 -->
    <mt-loadmore
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      :bottomPullText="bottomPullText"
      ref="loadmore"
    >
      <div class="shoplist">
        <index-shop
          v-for="(item, index) in restaurants"
          :key="index"
          :restaurant="item.restaurant"
        ></index-shop>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
//导入子组件
import FilterView from "../../components/content/FilterView.vue";
import IndexShop from "../../components/content/IndexShop.vue";
//导入mint-ui库中的组件
import { Swipe, SwipeItem } from "mint-ui";
import { Loadmore } from "mint-ui";

//导入网络模块
import { request } from "network/request";

export default {
  name: "home",
  data() {
    return {
      swipeImgs: [], //存放轮播图的图片
      entries: [], //轮播图下面的条目栏
      filterData: null, //筛选栏的数据
      restaurants: [], //商品列表的数据
      page: 1, //加载哪一页商品
      size: 5, //一次加载多少商品
      showFilter: false, //搜索栏置顶
      allLoaded: false, //商品是否加载完
      bottomPullText: "上拉加载更多", //上拉时文本
      data: null, //筛选条件
    };
  },
  computed: {
    address() {
      return this.$store.getters.address;
    },
    city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      );
    },
  },
  created() {
    //获取首页的数据
    this.getData();
  },
  methods: {
    //获取首页数据
    getData() {
      //轮播图和分类的数据
      request("/profile/shopping").then((res) => {
        // console.log(res);
        this.swipeImgs = res.data.swipeImgs;
        this.entries = res.data.entries;
      });
      //筛选栏的数据
      request("/profile/filter").then((res) => {
        // console.log(res);
        this.filterData = res.data;
      });
      //获取商家信息
      this.loadTop();
    },
    //点击筛选栏的综合排序让搜索栏置顶
    searchFixed(isShow) {
      this.showFilter = isShow;
    },
    //根据所选的排序方式更新数据
    update(condation) {
      console.log(condation);
    },
    //上拉刷新
    loadTop() {
      this.page = 1;
      this.allLoaded = false;
      this.bottomPullText = "上拉加载更多";
      //获取商品列表的数据
      request({
        url: `/profile/restaurants/${this.page}/${this.size}`,
        method: "post",
        data: this.data,
      }).then((res) => {
        // console.log(res.data);
        this.$refs.loadmore.onTopLoaded();
        this.restaurants = res.data;
      });
    },
    //下拉至底部加载更多
    loadBottom() {
      if (!this.allLoaded) {
        this.page++;
        //获取更多的商品列表数据
        request({
          url: `/profile/restaurants/${this.page}/${this.size}`,
          method: "post",
        }).then((res) => {
          this.$refs.loadmore.onBottomLoaded();
          if (res.data.length > 0) {
            res.data.forEach((item) => {
              this.restaurants.push(item);
            });
            if (res.data < this.size) {
              this.allLoaded = true;
              this.bottomPullText = "没有更多了哦";
            }
          } else {
            this.allLoaded = true;
            this.bottomPullText = "没有更多了哦";
          }
        });
      }
    },
    //根据筛选条件刷新商品列表
    update(condation) {
      console.log(condation);
      this.data = condation;
      this.loadTop();
    },
  },
  components: {
    Swipe,
    SwipeItem,
    Loadmore,
    FilterView,
    IndexShop,
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header,
.search_wrap {
  background-color: #009eef;
  padding: 10px 16px;
}
.header .address_map {
  color: #fff;
  font-weight: bold;
}
.address_map i {
  margin: 0 3px;
  font-size: 18px;
}
.address_map span {
  display: inline-block;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.search_wrap .shop_search {
  /* margin-top: 10px; */
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}

.search_wrap {
  position: sticky;
  top: 0px;
  z-index: 999;
  box-sizing: border-box;
}
.swiper {
  height: 100px;
}
.swiper img {
  width: 100%;
  height: 100px;
}

.entries {
  background: #fff;
  height: 47.2vw;
  text-align: center;
  overflow: hidden;
}
.foodentry {
  width: 20%;
  float: left;
  position: relative;
  margin-top: 2.933333vw;
}
.foodentry .img_wrap {
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 12vw;
}
.img_wrap img {
  width: 100%;
  height: 100%;
}
.foodentry span {
  display: block;
  color: #666;
  font-size: 0.32rem;
}
/* 推荐商家 */
.shoplist-title {
  display: flex;
  align-items: flex;
  justify-content: center;
  height: 9.6vw;
  line-height: 9.6vw;
  font-size: 16px;
  color: #333;
  background: #fff;
}
.shoplist-title:after,
.shoplist-title:before {
  display: block;
  content: "一";
  width: 5.333333vw;
  height: 0.266667vw;
  color: #999;
}
.shoplist-title:before {
  margin-right: 3.466667vw;
}
.shoplist-title:after {
  margin-left: 3.466667vw;
}

.fixedview {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 999;
}

.filter_fixed {
  position: sticky;
  top: 54px;
}
.mint-loadmore {
  height: calc(100% - 95px);
  overflow: auto;
}
</style>
