// tile
import tpl from './tile.html';
import Vue from 'vue';

export default Vue.component('v-tile', { 
    template: tpl,
    props:{
        "tile": {
          type: Object,
          twoWay: true    
        }
    },
    computed: {
        calcStyleX: function(cord) {
            var tilePosition = this.$parent.tilePosition; 
            return tilePosition * this.tile.x;
        },

        calcStyleY: function(cord) {
            var tilePosition = this.$parent.tilePosition; 
            return tilePosition * this.tile.y;
        },
        isMerged: function(){
            return 'tile-merged';
        }
    }
});