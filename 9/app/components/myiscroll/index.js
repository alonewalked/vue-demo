import Vue from 'vue';
import iscroll from '../../lib/iscroll'; 
let MyIscroll = Vue.extend({
    template: require('./myiscroll.html'),
    props:['items'],
    attached() {
        this.wrapper = this.$els.wrapper;
        this.list = this.$els.list;
        this.unwatch = this.$watch('$data.items', this.check, {deep: true});
    },
    methods:{
        check() {
            if(this.items.length === this.list.children.length){
                this.setup();
            }
        },
        setup() {
            var _w = this.items.length*$(this.list.children[0]).width();
            $(this.list).css('width',_w+'px');
            this.scroll = new iscroll(this.wrapper, {
                scrollY: false,
                scrollX: true,
                eventPassthrough: true
            });
            this.unwatch();
        }
    }
})
// register
Vue.component('my-iscroll', MyIscroll);

export default MyIscroll;