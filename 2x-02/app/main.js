import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuex from 'vuex';

import Element from 'element-ui';

import App from './app';
import Home from './components/home';
import About from './components/about';

Vue
.use(VueRouter)
.use(VueResource)
.use(Vuex)
.use(Element);

const store = new Vuex.Store({
    state: {
        data: ''
    }
});

const router = new VueRouter({
    mode: 'history',
    routes:[{
        path: '/home',
        component: Home
    },{
        path: '/about',
        component: About
    },
    {path: '*', redirect: '/home'}]
});

new Vue({
    router,
    store,
    render: h=>h(App)
}).$mount('#app');
