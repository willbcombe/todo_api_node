const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todo_app', (err, client)=> {
    if(err){
        return console.log('Cannot connect to mongodb server');
    }
    console.log('connected to mongodb server');
    const db = client.db('todo_app');

    db.collection('users').deleteMany({name: 'Will'});
    db.collection('users').findOneAndDelete({_id: new ObjectID('5c257931ccc65505c83e2437')})
        .then((results)=>{
            console.log(JSON.stringify(results, undefined, 2));
        })
    });
