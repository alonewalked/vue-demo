import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app';

import Home from './components/home';
import About from './components/about';

Vue.use(VueRouter);
//const Home = resolve=>require(['./views/home.vue'], resolve);

const router = new VueRouter({
    mode: 'history',
    routes:[
        {path: '/home', component: Home},
        {path: '/about', component: About},
        {path: '*', redirect: '/home'}
    ]
});

new Vue({
    router,
    render: h=>h(App)
}).$mount('#app');
