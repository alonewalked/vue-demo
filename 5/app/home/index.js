// home index
require('./home.css');
Vue.use(require('vue-viewport'));
require('../components/lazyImg');
Vue.use(require('../directive/topbox')); 
module.exports = Vue.extend({
    template: require('./home.html'),
    data:function(){
	  return {
		  images:[]
	  };
    },
    ready:function(){
        this.images = (function(){
              var list = [],_u;
              for(var i=1;i<=50;i++){ 
                  list.push({
                     url:'http://img2.3lian.com/2014/f2/52/'+i+'.jpg'
                  });
              }
              return list;
          })();
    }
});