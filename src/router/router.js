//1导入路由插件
import VueRouter from 'vue-router'
// 2注册路由
import Vue from 'vue'
// 导入login子组件
import login from '@/view/login/login.vue'
import layout from "@/view/home/layout.vue"
Vue.use(VueRouter);
// 3路由实例化
let router = new VueRouter({
    routes: [
        {
            // login子组件
            path: "/",
            component: login
        },
        { path: '/home', component: layout }
    ]
});
export default router