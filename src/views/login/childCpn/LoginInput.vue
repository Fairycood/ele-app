<template>
  <div class="login-input">
    <!-- 组件结构 -->
    <!-- 组件容器 -->
    <div class="input-group" :class="{ 'is-invalid': error }">
      <!-- 输入框 -->
      <input
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :name="name"
        @input="$emit('input', $event.target.value)"
      />
      <!-- 输入框后面的按钮 -->
      <button v-if="btnTitle" :disabled="disabled" @click="$emit('btnClick')">
        {{ btnTitle }}
      </button>
    </div>
    <!-- 输入框下面的错误提醒 -->
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: "LoginInput",
  data() {
    return {};
  },
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: String, //要绑定的值
    placeholder: String, //给定的提醒
    name: String,
    btnTitle: String,
    disabled: Boolean, //决定当前按钮是否可用
    error: String,
  },
  methods: {},
  components: {},
};
</script>

<style scoped>
.input-group {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.input-group input {
  height: 100%;
  width: 60%;
  border: none;
  outline: none;
}
.input-group button {
  border: none;
  outline: none;
  background: #fff;
}
.input-group button[disabled] {
  color: #aaa;
}
.is-invalid {
  border: 1px solid red;
}
.error {
  color: red;
  padding-top: 5px;
}
</style>
