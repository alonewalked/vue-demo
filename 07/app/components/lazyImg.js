Vue.component('lazy-img', {
    template:'<img src="" width="60" height="60" v-detect-viewport/>',
    props:['dataSrc'],
    created: function () {
        var me = this;
        this.$on('viewportenter', function () {
            if(me.dataSrc){
                me.$el.setAttribute('src',me.dataSrc);
                me.dataSrc = '';
            }
        });
    }
})