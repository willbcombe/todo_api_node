let express = require('express');
let bodyParser = require('body-parser');
let {ObjectID} = require('mongodb');
let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

//POST todo
app.post('/todos', (req, res) => {
    console.log(req.body);
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc)
    }, (e)=> {
        res.status(400).send(e);
    });
});
//GET ALL todos
app.get('/todos', (req, res) =>{
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', (req, res)=>{
    //res.send(req.params);
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        //if status is 200 OK!
        res.send({todo});
        //console.log('todo by id', todo)
    }).catch((e) =>{res.status(400).send(e)});
});

app.delete('/todos/:id', (req, res)=>{
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        console.log(`removed ${todo}`);
        if(!todo){
            return res.status(404).send();
        }
        //if status is 200 OK!
        res.send(res.status(200).send(todo));
    }).catch((e) =>{res.status(400).send(e)});

});
app.listen(port, () => {
    console.log(`Starting on port ${port}`)
});

module.exports ={app};