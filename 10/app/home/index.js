// home index

import './home.css';
import tpl from './home.html';
import '../directive/showMore';
export default {
    template:tpl,
    data() {
        return {
            regurl:'http://www.tngou.net/api/cook/list?rows=1',
            data: {
                name:'',
                keywords:'',
                food:'',
                description:'',
                count:''
            }
        }
    },
    ready() {
        this.$http.jsonp(this.$data.regurl, function (data, status, request){
            this.$set('data', data.tngou[0]); 
        }).error(function (data, status, request) {
            // handle error
        });
    }
}