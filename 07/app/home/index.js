// home index
require('./home.css');
Vue.use(require('vue-viewport'));
require('../components/lazyImg');
require('../components/reddot');
require('../components/loadMore');
Vue.use(require('../directive/topbox')); 
var cIndx = 1;
module.exports = Vue.extend({
    template: require('./home.html'),
    data:function(){
	  return {
		  images:[],
          todaykey:'',
          reddit:{
            finished:false,
            busy:false,
            next:this.getNext
          }
	  };
    },
    methods:{
        getData: function(){
            var me = this;
            this.reddit.busy = true;
            var list = [],_u;
            (function(){
                var i;
                for(i=cIndx;i<cIndx+10;i++){
                    list.push({
                        url:'http://img2.3lian.com/2014/f2/52/'+i+'.jpg'
                    });
                }
                cIndx=i;
            })()
            setTimeout(function(){
                me.reddit.busy = false;
            },1500)
            return list;
        },
        getNext: function(){
             if(cIndx<100){
                 this.images = this.images.concat(this.getData());
             }
             else{
                 this.reddit.finished = true;
             }
        }
    },
    created:function(){
        this.images = this.images.concat(this.getData());
        this.todaykey = $.fn.getToday();
    }
});