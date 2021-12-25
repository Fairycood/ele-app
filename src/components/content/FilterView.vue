<template>
  <div :class="{ open: isMask || isScreen }" @click.self="hideView">
    <!-- 导航栏内容 -->
    <div class="filter_wrap" v-if="filterData" :class="{ top: isTop }">
      <aside class="filter">
        <div
          class="filter-nav"
          v-for="(item, index) in filterData.navTab"
          :key="index"
          @click="filterClick(index)"
          :class="{ 'filter-bold': isCurrent == index }"
        >
          <span>{{ item.name }}</span>
          <i v-if="item.icon" :class="'fa fa-' + item.icon"></i>
        </div>
      </aside>
    </div>
    <!-- 排序内容 -->
    <section class="filter-extend" v-if="isMask">
      <ul>
        <li
          v-for="(item, index) in filterData.sortBy"
          :key="index"
          @click="checkSort(item, index)"
        >
          <span :class="{ selectName: isCheck == index }">{{ item.name }}</span>
          <i class="fa fa-check" v-if="isCheck == index"></i>
        </li>
      </ul>
    </section>
    <!-- 筛选内容 -->
    <section class="filter-extend" v-if="isScreen">
      <div class="filter-sort">
        <div
          class="morefilter"
          v-for="(screen, index) in filterData.screenBy"
          :key="index"
        >
          <span class="title">{{ screen.title }}</span>
          <ul>
            <li
              v-for="(item, index) in screen.data"
              :key="index"
              :class="{ selected: item.select }"
              @click="selectScreen(item, screen)"
            >
              <img v-if="item.icon" :src="item.icon" alt />
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
        <div class="morefilter-btn">
          <span
            class="morefilter-clear"
            :class="{ edit: edit }"
            @click="clear()"
            >清空</span
          >
          <span class="morefilter-ok" @click="filterOk">确定</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "FilterView",
  props: {
    filterData: Object,
  },
  data() {
    return {
      isCurrent: 0, //筛选栏上的item是否加粗
      isMask: false, //是否显示排序内容
      isCheck: 0, //排序内容上的li是否高亮
      isScreen: false, //是否显示筛选内容
      isTop: false,
    };
  },
  computed: {
    //筛选内容上的清空按钮是否高亮
    edit() {
      let edit = false;
      this.filterData.screenBy.forEach((screen) => {
        screen.data.forEach((ele) => {
          if (ele.select) {
            edit = true;
          }
        });
      });
      return edit;
    },
  },
  methods: {
    //点击搜索栏的item
    filterClick(index) {
      this.isCurrent = index;
      switch (index) {
        case 0:
          this.isScreen = false;
          this.isMask = true;
          this.isTop = true;
          this.$emit("searchFixed", true);
          break;
        case 1:
          this.$emit("update", {
            condition: this.filterData.navTab[1].condition,
          });
          this.hideView();
          break;
        case 2:
          this.$emit("update", {
            condition: this.filterData.navTab[2].condition,
          });
          this.hideView();
          break;
        case 3:
          this.isMask = false;
          this.isScreen = true;
          this.isTop = true;
          this.$emit("searchFixed", true);
          break;
        default:
          this.hideView();
          break;
      }
    },
    //点击蒙版使搜索栏下来隐藏蒙版
    hideView() {
      this.isMask = false;
      this.isScreen = false;
      this.isTop = false;
      this.$emit("searchFixed", false);
    },
    //点击综合排序中的li，改变所选li的样式以及导航栏上的排序名称
    checkSort(item, index) {
      this.isCheck = index;
      this.filterData.navTab[0].name = item.name;
      //更新数据
      this.$emit("update", { condition: item.code });
    },
    //在筛选的内容里点击对应的li使对应的li的样式发生变化
    selectScreen(item, screen) {
      if (screen.id !== "MPI") {
        // 单选
        screen.data.forEach((ele) => {
          ele.select = false;
        });
      }
      item.select = !item.select;
    },
    //清空筛选内容上所选的li
    clear() {
      this.filterData.screenBy.forEach((screen) => {
        screen.data.forEach((item) => {
          item.select = false;
        });
      });
    },
    //点击筛选栏的确定按钮然后按照所选的筛选条件进行筛选
    filterOk() {
      let screenData = {
        MPI: "",
        offer: "",
        per: "",
      };
      let mpiStr = "";
      this.filterData.screenBy.forEach((screen) => {
        screen.data.forEach((item, index) => {
          if (item.select) {
            // 两种情况 1.多选 2.单选
            if (screen.id !== "MPI") {
              // 单选
              screenData[screen.id] = item.code;
            } else {
              // 多选 fengniao,pinpai
              mpiStr += item.code + ",";
              screenData[screen.id] = mpiStr;
            }
          }
        });
      });
      // console.log(mpiStr);
      this.$emit("update", { condition: screenData });
      this.hideView();
    },
  },
  components: {},
};
</script>

<style scoped>
.filter_wrap {
  background: #fff;
  position: sticky;
  /* box-sizing: border-box; */
  width: 100%;
  /* top: 54px; */
  z-index: 10;
}
.top {
  position: fixed;
  top: 54px;
}
.filter {
  position: relative;
  border-bottom: 1px solid #ddd;
  line-height: 10.4vw;
  z-index: 101;
  height: 10.666667vw;
  display: flex;
  justify-content: space-around;
}
.filter-nav {
  flex: 1;
  text-align: center;
  color: #666;
  font-size: 0.8333rem;
  overflow: hidden;
}

.filter-nav i {
  width: 1.6vw;
  height: 0.8vw;
  margin-left: 1.333333vw;
  margin-bottom: 0.533333vw;
  fill: #333;
  will-change: transform;
}

.filter-bold {
  font-weight: 600;
  color: #333;
}

.open {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 3;
}

.filter-extend {
  background-color: #fff;
  color: #333;
  padding-top: 2.133333vw;
  position: absolute;
  width: 100%;
  z-index: 4;
  left: 0;
  top: 24.533333vw;
}
.filter-extend li {
  position: relative;
  padding-left: 5.333333vw;
  line-height: 10.666667vw;
}
.fa-check {
  float: right;
  color: #009eef;
  margin-right: 3.733333vw;
  line-height: 10.666667vw;
}

.selectName {
  color: #009eef;
}
/* 筛选 */
.filter-sort {
  background: #fff;
  padding: 0 2.666667vw;
  line-height: normal;
}
.morefilter {
  margin: 2.666667vw 0;
  overflow: hidden;
}
.morefilter .title {
  margin-bottom: 2vw;
  color: #666;
  font-size: 0.5rem;
}
.morefilter ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 0.8rem;
}
.morefilter li {
  box-sizing: border-box;
  width: 30%;
  height: 9.333333vw;
  line-height: 9.333333vw;
  margin: 0.8vw 1%;
  background: #fafafa;
}
.morefilter li img {
  width: 3.466667vw;
  height: 3.466667vw;
  vertical-align: middle;
  margin-right: 0.8vw;
}
.morefilter li span {
  margin-left: 2%;
  vertical-align: middle;
}

.morefilter-btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fafafa;
  box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
  line-height: 11.466667vw;
  box-sizing: border-box;
}
.morefilter-btn span {
  font-size: 0.826667rem;
  text-align: center;
  text-decoration: none;
  flex: 1;
}
.morefilter-clear {
  color: #ddd;
  background: #fff;
}
.morefilter-ok {
  color: #fff;
  background: #00d762;
  border: 0.133333vw solid #00d762;
}

.selected {
  color: #3190e8 !important;
  background-color: #edf5ff !important;
}

.edit {
  color: #333 !important;
}
</style>
