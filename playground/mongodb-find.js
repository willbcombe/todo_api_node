//const MongoClient = require('mongodb').MongoClient;
    //grabs attribute via destructuring identical to code above
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todo_app', (err, client)=> {
    if(err){
        return console.log('Cannot connect to mongodb server');
    }
    console.log('connected to mongodb server');
   const db = client.db('todo_app');
    db.collection('todos').find().count()
            .then((count)=>{
                console.log(`Todo ${count}`);
                //console.log(JSON.stringify(count, undefined, 2))
            }, (err)=>{
                console.log('unable to insert todo', err);
            //console.log(JSON.stringify(result.ops,undefined,2));
            });

    // db.collection('todos').find({_id: new ObjectID('5c257931ccc65505c83e2437').toArray().then
    // ((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2))
    //     }, (err)=>{
    //     if(err){
    //         return console.log('unable to insert todo', err);
    //     }
    //     //console.log(JSON.stringify(result.ops,undefined,2));
    //     });

    //close connection
    //client.close();

});