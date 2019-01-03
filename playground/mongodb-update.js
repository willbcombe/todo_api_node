const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todo_app', (err, client)=> {
    if(err){
        return console.log('Cannot connect to mongodb server');
    }
    console.log('connected to mongodb server');
    const db = client.db('todo_app');

  //  db.collection('users').updateMany({name: 'Will'});
    db.collection('todos').findOneAndUpdate({
            _id: new ObjectID("5c25792d390ba22740ce373b")
        }, //actual updates to be applied
        {
            //set update operator for updating fields
            $set : {
                completed: true
            }
        },{
            returnOriginal: false
        })
        .then((results)=>{
            console.log(results);
        });

    db.collection('users').findOneAndUpdate({
            _id: new ObjectID("5c2572b2a8a5b412d83d62c7")
        }, //actual updates to be applied
        {
            //set update operator for updating fields
            $set : {
                name: 'William'
            },
            //increment operator
            //ex. property : increment
            $inc: {
                age:1
            }
        },{
            returnOriginal: false
        })
        .then((results)=>{
            console.log(results);
        })
});
