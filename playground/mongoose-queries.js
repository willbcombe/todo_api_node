const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {ObjectID} = require('mongodb');
let id = '5c25ac900429952a88642d7b-';

if(!ObjectID.isValid(id)){
    console.log('id is not valid')
}
// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log('Todos', todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//     console.log('Todo by findOne', todo);
// });

Todo.findById(id).then((todo)=>{
    if(!todo){
        return console.log('id not found');
    }
    console.log('todo by id', todo)
}).catch((e) => console.log(e));