//1导入路由插件
import VueRouter from 'vue-router'
// 2注册路由
import Vue from 'vue'
// 导入login子组件
import login from '@/view/login/login.vue'
import layout from "@/view/home/layout.vue"
import chart from '@/view/home/chart/chart.vue'
import userList from '@/view/home/userList/userList.vue'
import question from '@/view/home/question/question.vue'
import business from '@/view/home/business/business.vue'
import subject from '@/view/home/subject/subject.vue'
Vue.use(VueRouter);
// 3路由实例化
let router = new VueRouter({
    routes: [
        {
            // login子组件
            path: "/",
            component: login
        },
        {
            path: '/home',
            redirect: '/home/subject',
            component: layout,
            children: [
                { path: 'chart', component: chart },
                { path: 'userList', component: userList },
                { path: 'question', component: question },
                { path: 'business', component: business },
                { path: 'subject', component: subject },
            ]
        }
    ]
});
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach((to, from, next) => {
    Nprogress.start()
    next()
})
router.afterEach((to, from) => {
    Nprogress.done()
    console.log(from);
})
export default router