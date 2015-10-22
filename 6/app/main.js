require('./lib/zepto');
window.lscache = require('./lib/lscache');
// define some components
window.Vue = require('vue');
window.VueRouter = require('vue-router');

var Home = require('./home');
var Cate = Vue.extend({
  template: 
	'<div >' +
      '<h2>This is Cate!</h2>' +
      '<router-view></router-view>' + 	// <- nested outlet
    '</div>'
});
var Cate1 = Vue.extend({
  template: '<p>This is cate 1!</p>'
});
var Cate2 = Vue.extend({
  template: '<p>This is cate 2!</p>'
});
var Search = Vue.extend({
	template: 
	'<div >' +
      '<h2>This is Search!</h2>' +
      '<router-view></router-view>' + 	// <- nested outlet
    '</div>'
});
var SubSearch = Vue.extend({
	template: '<p v-if="$route.query" >query is {{$route.query | json}}</p>'+
	'<p v-if="$route.params" >params is {{$route.params | json}}</p>'
});

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
    component: Cate,
	subRoutes: {
			'/':{
        		component: {
        			template: '<p>Default sub view for Cate</p>'
        		}
        	},
        	'/1':{
        		component:Cate1
        	},
        	'/2':{
        		component:Cate2
        	}
	}
  },
  'search': {
	component: Search,
	subRoutes: {
		'/':{
			component: SubSearch
		},
		'/:word':{
			component:SubSearch
		},
		'/*key':{
			component:SubSearch
		}
	}
  }
});

// now we can start the app!
// router will create an instance of App and mount to
// the element matching the selector #app.
router.start(App, '#app')
