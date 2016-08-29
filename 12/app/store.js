// store
import { EventEmitter } from 'events';
import { Promise } from 'es6-promise'; 

const config = {
    base: 'https://tctj.wilddogio.com/',
    sub: 'demos'
}
const api = new Wilddog(config['base'] + config['sub']);
const store = new EventEmitter(); 
let storeData  = {};

api.on('value', data => {
  storeData['list'] = data.val();
  store.emit('data-updated');
});

store.on('data-updated', e =>{
    e = e || {};
    if(e.callback){
        e.callback();
    }
});

export default {
    add (id, doc){
        return new Promise((resolve, reject) => {
            api.once('child_added', node => {
                let item = node.val();
                item.id = node.key(); 
                storeData['list'].push(doc);
                resolve(storeData['list']);
            },reject); 
            api.child(id).set(doc);
        });
    },
    update (id,doc){
        return new Promise((resolve, reject) => {
            api.child(id).update(doc, err=>{
                if(err){
                    reject(err);
                }
                else{
                    storeData['list'][id] = doc;
                    resolve(storeData['list']);
                }
            });
        });  
    },
    delete (id){
        return new Promise((resolve, reject) => {
            api.once('child_removed', node=>{ 
                delete storeData['list'][id];
                resolve(storeData['list']);
            },reject);  
            new Firebase(config['base'] + config['sub'] + '/' + id).remove();
        });
    },
    getAll (){  
        return new Promise((resolve, reject) => {
            api.once('value', data => {
                resolve(data.val());
            }, reject);
        });
    }
}