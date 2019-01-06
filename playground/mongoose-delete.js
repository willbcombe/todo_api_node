const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//delete multiple records
//This will remove all records
Todo.remove({}).then((result)=> {
    console.log(result);
});

//remove one record
Todo.findOneAndRemove().then((result)=>{
   console.log(result)
});

Todo.findByIdAndRemove('asdf').then((todo) => {
   console.log(`removed ${todo}`);
});














