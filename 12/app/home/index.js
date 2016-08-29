// home index
import tpl from './home.html';
import store from '../store';
import Vue from 'vue';

export default {
    template: tpl,
    data() {
        return {
            newTodo:null,
            editedTodo:null,
            todolist:[]
        }
    },
    ready() {
        store.getAll().then(
        data =>{
           this.$set('todolist',data);
        }, 
        err =>{
           console.log(err); 
        });
    },
    methods: {
        addTodo(){
            let _id = this.todolist.length;
            let _doc = {title:this.newTodo,completed:false};
            store.add(_id,_doc).then(
            data =>{
               this.$set('newTodo','');
               this.$set('todolist',data);
            }, 
            err =>{
               this.$set('newTodo','');
               console.log(err); 
            });
        },
        editTodo(idx, doc) {
            this.$set('editedTodo',doc);
        },
        doneEdit(idx, doc){
            if (!this.editedTodo) {
                return;
            }
            this.editedTodo = null;
            doc.title = doc.title.trim();
            if (!doc.title) {
                return this.removeTodo(idx);
            }
            store.update(idx,{
                title:doc.title,
                completed:doc.completed
            }).then(
            data =>{ 
               this.$set('todolist',data);
            }, 
            err =>{  
               console.log(err); 
            });
        },
        cancelEdit(){
            this.$set('editedTodo',null);
        },
        removeTodo (idx, todo){
            store.delete(idx).then(
            data =>{ 
               this.$set('todolist',data);
            }, 
            err =>{  
               console.log(err); 
            });
        },
        completeChanged(idx, doc) {
            setTimeout(()=>{
                store.update(idx,{
                    title:doc.title,
                    completed:doc.completed
                }).then(
                data =>{ 
                   this.$set('todolist',data);
                }, 
                err =>{  
                   console.log(err); 
                });
            },300);
            
        }
    },
    directives: {
        'todo-focus': function (value) {
            if (!value) {
                return;
            }
            var el = this.el;
            Vue.nextTick(function () {
                el.focus();
            });
        }
    }

}