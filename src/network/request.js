import axios from 'axios';
import Vue from 'vue';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import { Indicator } from 'mint-ui';
Vue.use(MintUI);


export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: '/api',
    timeout: 5000
  })

  //2.axios的拦截器
  //2.1.请求拦截
  instance.interceptors.request.use(config => {
    // 加载动画
    Indicator.open('在加载啦...')
    return config
  }, err => {
    // 对请求错误要做的事情
    console.log(err);
  })

  //2.2.响应拦截
  instance.interceptors.response.use(res => {
    // 关闭加载动画
    Indicator.close()
    return res
  }, err => {
    // 对响应错误要做的事情
    console.log(err);
    //关闭加载动画
    Indicator.close()
  })

  //3.发送真正的网络请求
  return instance(config)
}