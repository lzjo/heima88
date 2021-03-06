import Vue from 'vue'
import App from './App.vue'
//导入element插件
import ElementUI from 'element-ui';
//导入element插件的css
import 'element-ui/lib/theme-chalk/index.css';
//注册element
Vue.use(ElementUI);
//导入路由文件
import router from '@/router/router.js'
import store from '@/store/index.js'


Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')