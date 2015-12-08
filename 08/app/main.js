import './lib/zepto';

import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import Home from './home'; 

Vue
.use(Router)
.use(Resource);

var router = new Router();

router.map({
  '/home': {
    component: Home
  }
});
router.redirect({
  // 重定向 /home
  '/': '/home'
});

let App = Vue.extend({});
router.start(App, '#app')