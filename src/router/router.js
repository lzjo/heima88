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
                title: '登录',
                rule: ['超级管理员', '管理员', '老师', '学生']
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
                        title: '数据概览',
                        rule: ['超级管理员', '管理员'],
                        icon: 'el-icon-pie-chart'

                    },
                },
                {
                    path: 'userList',
                    component: userList,
                    meta: {
                        title: '用户列表',
                        rule: ['超级管理员', '管理员'],
                        icon: 'el-icon-user'

                    },
                },
                {
                    path: 'question',
                    component: question,
                    meta: {
                        title: '题库列表',
                        rule: ['超级管理员', '管理员', '老师'],
                        icon: 'el-icon-edit-outline'


                    },
                },
                {
                    path: 'business',
                    component: business,
                    meta: {
                        title: '企业列表',
                        rule: ['超级管理员', '管理员', '老师'],
                        icon: 'el-icon-office-building'


                    },
                },
                {
                    path: 'subject',
                    component: subject,
                    meta: {
                        title: '学科列表',
                        rule: ['超级管理员', '管理员', '老师', '学生'],
                        icon: 'el-icon-notebook-2'


                    },
                },
            ]
        }
    ]
});
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store/index.js'
import { Message } from 'element-ui';
import { removeToken } from '@/utils/token.js'
router.beforeEach((to, from, next) => {
    Nprogress.start()
    if (to.meta.rule.includes(store.state.role)) {
        next()
    } else {
        Message.warning("您无权访问此页面");
        removeToken();
        next('/')
    }
})
router.afterEach((to, from) => {
    Nprogress.done()
    document.title = to.meta.title
    console.log(from);
})
export default router