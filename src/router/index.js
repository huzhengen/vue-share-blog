import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/Index/template.vue'
import Login from '../pages/Login/template.vue'
import Register from '../pages/Register/template.vue'
import Detail from '../pages/Detail/template.vue'
import Create from '../pages/Create/template.vue'
import User from '../pages/User/template.vue'
import My from '../pages/My/template.vue'
import Edit from '../pages/Edit/template.vue'

import store from '../store/index.js'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            component: Index
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/detail/:blogId',
            component: Detail
        },
        {
            path: '/create',
            component: Create,
            meta: { requireAuth: true },
        },
        {
            path: '/user/:userId',
            component: User
        },
        {
            path: '/my',
            component: My,
            meta: { requireAuth: true },
        },
        {
            path: '/edit/:blogId',
            component: Edit,
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