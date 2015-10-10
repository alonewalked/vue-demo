// define some components
window.Vue = require('vue');
window.VueRouter = require('vue-router');

var Home = Vue.extend({
  template: '<p>This is Home!</p>'
})

var Cate = Vue.extend({
  template: '<p>This is cate!</p>'
})

// the router needs a root component to render.
// for demo purposes, we will just use an empty one
// because we are using the HTML as the app template.
var App = Vue.extend({})

// create a router instance
// you can pass in additional options here, but
// let's keep it simple for now.
var router = new VueRouter()

// define some routes.
// each route should map to a component.
// we'll talk about nested routes later.
router.map({
  '/home': {
    component: Home
  },
  '/cate': {
    component: Cate
  }
})

// now we can start the app!
// router will create an instance of App and mount to
// the element matching the selector #app.
router.start(App, '#app')
