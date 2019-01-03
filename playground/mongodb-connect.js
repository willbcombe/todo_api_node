//const MongoClient = require('mongodb').MongoClient;
    //grabs attribute via destructuring identical to code above
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
//console.log(obj);

MongoClient.connect('mongodb://localhost:27017/todo_app', (err, client)=> {
    if(err){
        return console.log('Cannot connect to mongodb server');
    }
    console.log('connected to mongodb server');
   const db = client.db('todo_app');

    db.collection('todos').insertOne({
        text: 'Something to do',
        completed: false
        }, (err, result)=>{
        if(err){
            return console.log('unable to insert todo', err);
        }
        console.log(JSON.stringify(result.ops,undefined,2));
        });

    db.collection('users').insertOne({
        name : 'Will B',
        age: 23,
        location: 'Vancouver BC'
    }, (err, result)=>{
        if(err){
            return console.log('unable to insert user', err);
        }
        console.log(result.ops[0]._id.getTimestamp());
    });
    //close connection
    client.close();

});