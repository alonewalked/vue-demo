import Swipe from '../../lib/swipe';
import tpl from './slider.html';
import Vue from 'vue';
let MySlider = Vue.extend({
    template: tpl,
    props:['items'],
    attached() {
        this.wrapper = this.$els.wrapper;
        this.pager = this.$els.pager;
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
            this.swipe = Swipe(this.wrapper, {
                pagerCon:$(this.pager),
                active:'selected',
                auto:5000
            });
            this.unwatch();
        }
    }
})
// register
Vue.component('my-slider', MySlider);

export default MySlider;