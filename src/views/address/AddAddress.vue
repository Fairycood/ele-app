<template>
  <div class="addAddress">
    <ele-header :isBack="true" :title="title" backUrl="profile"></ele-header>
    <!-- 要添加的地址 -->
    <div class="viewbody">
      <div class="content">
        <FormBlock
          label="联系人"
          placeholder="姓名"
          :tags="sexs"
          :sex="addressInfo.sex"
          @checkSex="checkSex"
          v-model="addressInfo.name"
        />
        <FormBlock
          label="电话"
          placeholder="手机号码"
          v-model="addressInfo.phone"
        />
        <FormBlock
          v-model="addressInfo.address"
          @click="showSearch = true"
          label="地址"
          placeholder="小区/写字楼/学校等"
          icon="angle-right"
        />
        <FormBlock
          label="门牌号"
          placeholder="10号楼5单元404"
          icon="edit"
          textarea="textarea"
          v-bind="addressInfo.bottom"
        />
        <div class="formblock">
          <div class="label-wrap">标签</div>
          <TabTag
            :tags="tags"
            :selectTag="addressInfo.tag"
            @checkTag="checkTag"
          />
        </div>
      </div>
      <!-- 确定按钮 -->
      <div class="form-button-wrap">
        <button class="form-button" @click="handleSave">确定</button>
      </div>
    </div>
    <!-- 搜索地址页面 -->
    <AddressSearch
      v-if="showSearch"
      @close="showSearch = false"
      @selectAddress="selectAddress"
    ></AddressSearch>
  </div>
</template>

<script>
import EleHeader from "components/content/EleHeader.vue";
import FormBlock from "./childComp/FormBlock.vue";
import TabTag from "./childComp/TabTag.vue";
import AddressSearch from "./AddressSearch.vue";
import { request } from "network/request.js";
import { Toast } from "mint-ui";
export default {
  name: "AddAddress",
  data() {
    return {
      title: "",
      tags: ["家", "公司", "学校"],
      sexs: ["先生", "女士"],
      addressInfo: {},
      showSearch: false, //是否显示搜索地址的页面
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      //将路由跳转时传的信息赋值过来
      vm.addressInfo = to.params.addressInfo;
      vm.title = to.params.title;
    });
  },
  methods: {
    //保存所选的标签
    checkTag(item) {
      this.addressInfo.tag = item;
    },
    //保存所选的性别标签
    checkSex(item) {
      this.addressInfo.sex = item;
    },
    //选定收货地址
    selectAddress(item) {
      this.addressInfo.address = `${item.name}${item.district}${item.address}`;
    },
    //点击确定按钮
    handleSave() {
      if (!this.addressInfo.name) {
        this.showMsg("请输入您的姓名");
        return;
      }
      if (!this.addressInfo.phone) {
        this.showMsg("请输入您的联系方式");
        return;
      }
      if (!this.addressInfo.address) {
        this.showMsg("请输入您的收货地址");
        return;
      }

      if ((this.title = "添加地址")) {
        this.addAddress();
      } else {
        this.editAddress();
      }
    },
    //显示输入的提示信息
    showMsg(msg) {
      Toast({
        message: msg,
        position: "bottom",
        duration: 2000,
      });
    },
    //将用户填好的地址信息上传到接口
    addAddress() {
      request({
        method: "post",
        url: `/user/add_address/${localStorage.ele_login}`,
        body: this.addressInfo,
      })
        .then((res) => {
          this.$router.push("myAddress");
        })
        .catch((err) => console.log(err));
    },
    //编辑收货地址
    editAddress() {
      request({
        method: "post",
        url: `/user/edit_address/${localStorage.ele_login}/${this.addressInfo._id}`,
        data: this.addressInfo,
      })
        .then((res) => {
          if (!this.$store.getters.userInfo) {
            this.$store.dispatch("setUserInfo", this.addressInfo);
          }
          this.$router.push("myAddress");
        })
        .catch((err) => console.log(err));
    },
  },
  components: {
    EleHeader,
    FormBlock,
    TabTag,
    AddressSearch,
  },
};
</script>

<style scoped>
.addAddress {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
}
.viewbody {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: #f5f5f5;
}

.content {
  padding-left: 4vw;
  background: #fff;
  font-size: 0.94rem;
}

.formblock {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
}
.formblock .label-wrap {
  flex-basis: 17.333333vw;
  padding: 3.733333vw 0;
  line-height: 4.8vw;
  color: #333;
  font-weight: 700;
}

/* 确定按钮 */
.form-button-wrap {
  padding: 5.333333vw 4vw;
  display: flex;
}
.form-button-wrap .form-button {
  background: #00d762;
  text-align: center;
  border-radius: 0.533333vw;
  flex: 1;
  font-size: 1.1rem;
  line-height: 5.066667vw;
  color: #fff;
  padding: 3.333333vw 0;
  border: none;
  font-weight: 500;
}
</style>
