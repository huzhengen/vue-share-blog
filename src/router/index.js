import Vue from 'vue'
import Router from 'vue-router'

// import Index from '../pages/Index/template.vue'
// import Login from '../pages/Login/template.vue'
// import Register from '../pages/Register/template.vue'
// import Detail from '../pages/Detail/template.vue'
// import Create from '../pages/Create/template.vue'
// import User from '../pages/User/template.vue'
// import My from '../pages/My/template.vue'
// import Edit from '../pages/Edit/template.vue'

const Index = () => import('@/pages/Index/template.vue')
const Login = () => import('@/pages/Login/template.vue')
const Register = () => import('@/pages/Register/template.vue')
const Detail = () => import('@/pages/Detail/template.vue')
const Create = () => import('@/pages/Create/template.vue')
const User = () => import('@/pages/User/template.vue')
const My = () => import('@/pages/My/template.vue')
const Edit = () => import('@/pages/Edit/template.vue')

// const Index = resolve => require(['@/pages/Index/template.vue'], resolve)
// const Login = resolve => require(['@/pages/Login/template.vue'], resolve)
// const Register = resolve => require(['@/pages/Register/template.vue'], resolve)
// const Detail = resolve => require(['@/pages/Detail/template.vue'], resolve)
// const Create = resolve => require(['@/pages/Create/template.vue'], resolve)
// const User = resolve => require(['@/pages/User/template.vue'], resolve)
// const My = resolve => require(['@/pages/My/template.vue'], resolve)
// const Edit = resolve => require(['@/pages/Edit/template.vue'], resolve)

import store from '../store/index.js'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            component: Index,
            // component: () => import('@/pages/Index/template.vue'),
        },
        {
            path: '/login',
            component: Login,
            // component: () => import('@/pages/Login/template.vue'),
        },
        {
            path: '/register',
            component: Register,
            // component: () => import('@/pages/Register/template.vue'),
        },
        {
            path: '/detail/:blogId',
            component: Detail,
            // component: () => import('@/pages/Detail/template.vue'),
        },
        {
            path: '/create',
            component: Create,
            // component: () => import('@/pages/Create/template.vue'),
            meta: { requireAuth: true },
        },
        {
            path: '/user/:userId',
            component: User,
            // component: () => import('@/pages/User/template.vue'),
        },
        {
            path: '/my',
            component: My,
            // component: () => import('@/pages/My/template.vue'),
            meta: { requireAuth: true },
        },
        {
            path: '/edit/:blogId',
            component: Edit,
            // component: () => import('@/pages/Edit/template.vue'),
            meta: { requireAuth: true },
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        store.dispatch('checkLogin').then(isLogin => {
            if (!isLogin) {
                next({
                    path: '/login',
                    query: { redirect: to.fullPath }
                })
            } else {
                next()
            }
        })
    } else {
        next()
    }
})

export default router