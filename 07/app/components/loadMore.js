Vue.component('load-more', {
    template:require('../template/loadMore.html'),
    props:['reddit'],
    data: function(){
        scrollto:false
    },
    watch:{
        'reddit.busy':{
            handler: function (val, oldVal) {
                if(oldVal && !val && this.scrollto){
                    this.reddit.next();
                }
            },
            deep: true
        }
    },
    created: function () {
        var me = this;
        this.$on('viewportenter', function() {
            this.scrollto = true;
            if(!me.reddit.busy && !me.reddit.finished){
                me.reddit.next();
            }
        });
        this.$on('viewportleave', function() {
            me.scrollto = false;
        });
    }
})
