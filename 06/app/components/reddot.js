Vue.component('red-dot', {
    template:'<span><i v-if="show" class="dot {{css}}"><span v-if="number>0">{{number}}</span></i></span>',
    props:['css','key','newer','number'],
    data: function(){
      return{
          show:false
      }  
    },
    methods: {
        _doClick: function(ev){
            ev.preventDefault();
            if(!this.show){
                return;
            }
            lscache.set(this.key+'_'+this.newer,1,60*24);
            this.show = false;
        },
        _checkShow: function(){
            if(!this.key || !this.newer){
                this.show = false;
                return;
            }
            // get local
            if(lscache.get(this.key+'_'+this.newer)){
                this.show = false;
                return;
            }
            this.show = true;
        }
    },
    created: function () {
        this._checkShow();
        this.css = this.css || '';
    },
    attached: function () {
         var parent = $(this.$el).parent('a');
         parent.on('click',this._doClick);
    },
    destroyed:function(){
        var parent = $(this.$el).parent('a');
        parent.off('click',this._doClick);
    }
})