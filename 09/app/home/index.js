// home index

import './home.css';
import tpl from './home.html';
import slider from '../components/myiscroll';
export default {
    template:tpl,
    components:{
        'my-iscroll': slider
    },
    data() {
        return {
            regurl:'http://www.tngou.net/api/cook/list?rows=10',
            imgs: []
        }
    },
    ready() {
        this.$http.jsonp(this.$data.regurl, function (data, status, request){ 
            data.tngou.forEach(function(i){
                i.img = 'http://tnfs.tngou.net/image'+i.img;
            });
            this.$set('imgs', data.tngou); 
        }).error(function (data, status, request) {
            // handle error
        });
    }
}