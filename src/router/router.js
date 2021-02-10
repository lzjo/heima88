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
            meta: {
                title: '登录'
            },
            component: login
        },
        {
            path: '/home',
            redirect: '/home/subject',
            component: layout,
            children: [
                {
                    path: 'chart',
                    component: chart,
                    meta: {
                        title: '数据概览'
                    },
                },
                {
                    path: 'userList',
                    component: userList,
                    meta: {
                        title: '用户列表'
                    },
                },
                {
                    path: 'question',
                    component: question,
                    meta: {
                        title: '题库列表'
                    },
                },
                {
                    path: 'business',
                    component: business,
                    meta: {
                        title: '企业列表'
                    },
                },
                {
                    path: 'subject',
                    component: subject,
                    meta: {
                        title: '学科列表'
                    },
                },
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
    document.title = to.meta.title
    console.log(from);
})
export default router