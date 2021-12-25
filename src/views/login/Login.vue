<template>
  <div id="login">
    <div class="logo">
      <img src="~assets/img/logo.jpg" alt="" />
    </div>
    <!-- 输入手机号 -->
    <login-input
      type="number"
      placeholder="手机号"
      v-model="phone"
      :btnTitle="btnTitle"
      :disabled="disabled"
      :error="errors.phone"
      @btnClick="getVerifyCode"
    ></login-input>
    <!-- 输入验证码 -->
    <login-input
      type="number"
      placeholder="请输入验证码"
      v-model="verifyCode"
      :error="errors.code"
    ></login-input>
    <!-- 用户服务协议 -->
    <div class="user-agreement">
      <p>
        新用户登录即自动注册，表示已同意
        <span>《用户服务协议》</span>
      </p>
    </div>
    <!-- 登陆按钮 -->
    <div class="login-btn">
      <button :disabled="isClick" @click="handleLogin">登录</button>
    </div>
  </div>
</template>

<script>
//导入子组件
import LoginInput from "./childCpn/LoginInput.vue";

//导入封装的axios
import { request } from "network/request.js";

export default {
  name: "Login",
  data() {
    return {
      phone: "",
      verifyCode: "", //验证码
      errors: {},
      btnTitle: "获取验证码",
      disabled: false,
    };
  },
  methods: {
    //验证手机号是否正确
    verifyPhone() {
      if (!this.phone) {
        this.errors = {
          phone: "手机号不能为空",
        };
        return false;
      } else if (
        !/^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/.test(
          this.phone
        )
      ) {
        this.errors = {
          phone: "请输入正确的手机号",
        };
        return false;
      } else {
        this.errors = {};
        return true;
      }
    },
    //设置获取验证码后的倒计时
    countDown() {
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.btnTitle = "获取验证码";
          this.disabled = false;
        } else {
          this.btnTitle = time + "秒后重试";
          this.disabled = true;
          time--;
        }
      }, 1000);
    },
    //获取验证码
    getVerifyCode() {
      if (this.verifyPhone()) {
        //验证码倒计时
        this.countDown();
        //发送获取验证码的网络请求
        request({
          method: "post",
          url: "/posts/sms_send",
          data: {
            sid: "52428d0e0a63b09ddfd7018ee2ffcfb3",
            token: "52a312776706888e89cc22c95e4b8f8b",
            appid: "f24279a0fb1e4381a0fdd56169034418",
            templateid: "123433",
            phone: this.phone,
          },
        }).then((res) => {
          console.log(res);
        });
      }
    },
    handleLogin() {
      //取消错误提醒
      this.errors = {};
      //发送请求
      request({
        method: "post",
        url: "/posts/sms_back",
        data: {
          phone: this.phone,
          code: this.verifyCode,
        },
      })
        .then((res) => {
          // 检验成功 设置登录状态并且跳转到/
          localStorage.setItem("ele_login", true);
          this.$router.push("/");
        })
        .catch((err) => {
          this.errors = {
            code: err.response.data.msg,
          };
        });
    },
  },
  computed: {
    isClick() {
      if (!this.phone || !this.verifyCode) return true;
      else return false;
    },
  },
  components: {
    LoginInput,
  },
};
</script>

<style scoped>
#login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
}
.logo {
  text-align: center;
}
.logo img {
  width: 150px;
}
.login-input,
.user-agreement,
.login-btn {
  margin-top: 20px;
}
.user-agreement {
  color: #aaa;
  line-height: 22px;
}
.user-agreement span {
  color: #4d90fe;
}
.login-btn button {
  width: 100%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}
.login-btn button[disabled] {
  background-color: #8bda81;
}
</style>
