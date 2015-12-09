import Vue from 'vue';
import KeyboardInputManager from '../keys';
import gameStorage from '../store'; 
import tile from '../components/tile';
import tpl from './game.html'
import { getWindowSize } from '../utils';
let Keys;

export default Vue.component('v-main', { 
    template:tpl, 
    components:{
        "v-tile":tile
    }, 
    directives: {
        selected: {
            isEmpty: true,
            bind: function () {
                if(this.vm.conf.size)
                    this.el.value = this.vm.conf.size;
            }
        }
    },
    data(){
        return {
            tileDimension: 124,
            tilePosition: 121,
            startTiles: 2,
            tiles: [],
            grid: [],
            conf: gameStorage.fetch('vue2048-config')
        }
    },
    created() {
        let opt = getWindowSize(); 
        this.$set('tileDimension',opt.dimension);
        this.$set('tilePosition',opt.position);
        
    },
    ready() {
        var data = gameStorage.fetch('vue2048'),
            conf = this.conf; 
        // go on latest
        if (conf.score) {
            this.continueGame(data);
        }
        else { 
            if (conf.length === 0) {
                //First Kick
                this.conf = {
                    score: 0,
                    size: 4,
                    bestScore: 0
                };
            } 
            this.init();
        }   
    },
    attached() {
        Keys = new KeyboardInputManager();
        Keys.on('move', direction=> {
            this.move(direction);
        }); 
        window.onresize = (event)=> {
            let opt = getWindowSize(); 
            this.$set('tileDimension',opt.dimension);
            this.$set('tilePosition',opt.position);
        };
    },
    //Can go to templates
    computed: {
        findDimension() {
            return this.grid.length * this.tileDimension;
        },
        selected() {
            return '';
        },
        allDone: {
            $get() {
                return this.remaining === 0;
            },
            $set(value) {
                this.todos.forEach(todo => {
                    todo.completed = value;
                });
            }
        }
    }, 
    methods: { 
        // init new game
        init() {   
            var startTiles = this.startTiles; 
            this.initArrayGrid(this.conf.size);
            this.clearMessage(); 
            this.tiles = [];
            this.updateScore(0); 
            for (var i = 0; i < startTiles; i++) {
                this.addRandomTile();
            }
        },
        // continue game with data
        continueGame(data) {
            var arr, conf; 
            conf = this.conf;
            this.initArrayGrid(conf.size);
            arr = this.grid;
            this.$set('tiles',data);

            data.forEach(item=> {
                arr[item.x][item.y] = 1;
            });
        },

        gameOver() {
            this.message();
        },
        
        // init grid matrix
        initArrayGrid(size) {
            var arr = [];

            for (var x = 0; x < size; x++) {
                arr[x] = [];
                for (var y = 0; y < size; y++) {
                    arr[x][y] = 0;
                }
            } 
            this.$set('grid',arr);
        },

        changesTilesSize(e) {
            e.preventDefault();
            this.conf.size = parseInt(e.target.value);

            if(document.activeElement)
                document.activeElement.blur();

            this.init();
        },
        
        // random tile add to grid
        addRandomTile() { 
            if (this.availableCells().length > 0) {
                var value = Math.random() < 0.9 ? 2 : 4,
                    randomCell = this.randomAvailableCell();

                this.addTile({
                    x: randomCell.x,
                    y: randomCell.y,
                    value: value,
                    merged: false
                });
            } 
        },
        
        // add tile to grid
        addTile(tile) { 
            var tiles = this.tiles,
                len = tiles.length; 
            tiles.push({
                x: tile.x,
                y: tile.y,
                value: tile.value,
                merged: tile.merged,
            });

            this.grid[tile.x][tile.y] = 1;
        },

        // Find the first available random position
        randomAvailableCell() {
            var cells = this.availableCells();

            if (cells.length) {
                return cells[Math.floor(Math.random() * cells.length)];
            }
        },
        
        // get fileds with no tile 
        availableCells() {
            var cells = [],
                size = this.conf.size,
                grid = this.grid;

            for (var x = 0; x < size; x++) {
                for (var y = 0; y < size; y++) {
                    if (!grid[x][y]) {
                        cells.push({
                            x: x,
                            y: y
                        });
                    }
                }
            }

            return cells;
        },

        // action for change
        getVector(direction) {
            var map = {
                0: {
                    x: 0,
                    y: -1
                }, // Up
                1: {
                    x: 1,
                    y: 0
                }, // Right
                2: {
                    x: 0,
                    y: 1
                }, // Down
                3: {
                    x: -1,
                    y: 0
                } // Left
            }; 
            return map[direction];
        },
        
        // the vector for edge of grid 
        findFarthestPosition(cell, vector) {
            var previous; 
            do {
                previous = cell;
                cell = {
                    x: previous.x + vector.x,
                    y: previous.y + vector.y
                };

            } while (this.withinBounds(cell) && !this.grid[cell.x][cell.y]); 
            return {
                farthest: previous,
                next: cell // Used to check if a merge is required
            };
        },

        // has tile in this field 
        findTile(position) {

            if (position.x === -1 || position.y === -1)
                return null;
            else {
                var tiles = this.tiles;

                return tiles.filter(function(item, index) {
                    return item.x === position.x && item.y === position.y;
                })[0];
            }

        },
        // move tile
        moveTile(tile, position) {

            if (tile.x === position.x && tile.y === position.y) {
                return false;
            } else {
                this.grid[tile.x][tile.y] = 0;
                this.grid[position.x][position.y] = 1;

                tile.x = position.x;
                tile.y = position.y;

                return true;
            }

        },
        // merge tile, delete from tiles list
        mergeTiles(curr, next, position) {

            next.value *= 2;
            next.merged = true;
            
            var tiles = this.tiles;

            //Better Way to find index of data
            for (var key in tiles) {
                if (tiles[key].x === curr.x && tiles[key].y === curr.y) {
                    //this.$children.$remove(parseInt(key));
                    this.tiles.splice(parseInt(key),1);
                    break;
                }
            }

            this.grid[curr.x][curr.y] = 0;

            // Update the score
            this.updateScore(next.value);

            return true;
        },
        
        // do it on any vector
        move(direction) {

            var vector = this.getVector(direction);
            var traversals = this.buildTraversals(vector);
            var moved = false;
            var self = this;
            var grid = self.grid;
            var positions;
            var next;
            var tile;


            traversals.x.forEach(function(x) {
                traversals.y.forEach(function(y) {
                    // console.log(x, y);
                    if (grid[x][y]) {
                        var tile = self.findTile({
                            x: x,
                            y: y
                        });
                        
                        //tile.merged = false;
                        
                        var positions = self.findFarthestPosition({
                            x: x,
                            y: y
                        }, vector);
                        //console.log(positions);
                        var next = self.findTile(positions.next);

                        //console.log(next); 
                        // Only one merger per row traversal?
                        if (next && next.value === tile.value) {

                            moved = self.mergeTiles(tile, next, positions.next);


                        } else {
                            moved = self.moveTile(tile, positions.farthest);
                        }

                    }

                });
            });

            if (moved) {
                this.addRandomTile();

                if (grid.toString().indexOf('0') === -1) {
                    if (!this.tileMatchesAvailable()) {
                        this.gameOver();
                    }

                }

            }

        },
        
        // check has any vailable field
        tileMatchesAvailable() {

            var size = this.conf.size;
            var grid = this.grid;
            var tiles = this.tiles;
            var tile;

            for (var x = 0; x < size; x++) {
                for (var y = 0; y < size; y++) {
                    tile = grid[x][y];

                    if (tile) {
                        for (var direction = 0; direction < 4; direction++) {
                            var vector = this.getVector(direction);
                            var cell = {
                                x: x + vector.x,
                                y: y + vector.y
                            },
                                other;

                            if (cell.x >= 0 && cell.x < size && cell.y >= 0 && cell.y < size) {
                                other = grid[cell.x][cell.y];
                            } else {
                                continue;
                            }

                            if (other && this.findTile(cell).value === this.findTile({
                                x: x,
                                y: y
                            }).value) {
                                return true; // These two tiles can be merged
                            }
                        }
                    }
                }
            }

            return false;
        },
        
        // inner edge
        withinBounds (position) {
            var size = this.conf.size;

            return position.x >= 0 && position.x < size && position.y >= 0 && position.y < size;
        },

        buildTraversals (vector) {
            var traversals = {
                x: [],
                y: []
            },
                size = this.conf.size;

            for (var pos = 0; pos < size; pos++) {
                traversals.x.push(pos);
                traversals.y.push(pos);
            }

            // Always traverse from the farthest cell in the chosen direction
            if (vector.x === 1) traversals.x = traversals.x.reverse();
            if (vector.y === 1) traversals.y = traversals.y.reverse();

            return traversals;
        },

        updateScore(score) {
            var scoreContainer = document.getElementsByClassName('score-container')[0];

            //On init
            if (score === 0) {
                this.conf.score = 0;
                //gameStorage.save('score', 0);

                return false;
            }


            this.conf.score += score;
            //gameStorage.save('score', this.score);

            if (this.conf.score > this.conf.bestScore) {
                this.conf.bestScore = this.conf.score;
                //gameStorage.save('bestScore', this.bestScore);
            }

            // The mighty 2048 tile
            if (score === 2048)
                this.message(true);

            var addition = document.createElement("div");
            addition.classList.add("score-addition");
            addition.textContent = "+" + score;
            scoreContainer.appendChild(addition);

        },

        message(won) {
            var type = won ? "game-won" : "game-over";
            var message = won ? "You win!" : "Game over!";
            var messageContainer = document.querySelector(".game-message");

            messageContainer.classList.add(type);
            messageContainer.getElementsByTagName("p")[0].textContent = message;
        },

        clearMessage() {
            var messageContainer = document.querySelector(".game-message");

            messageContainer.classList.remove("game-won");
            messageContainer.classList.remove("game-over");
        },

        clearContainer(container) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        } 
    }
});