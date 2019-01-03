const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../models/todo');
const {User} = require('../models/user');

const todos = [{text:' test 1'},{text:' test 2'},{text:' test 3'},{ text: 'test 4'}];
//empties db before every request.
beforeEach((done) => {
   Todo.remove({}).then(()=>{
       return Todo.insertMany(todos);
   }).then(()=>done());
});

describe('POST /todos', ()=> {
    it('should create a bew todo', (done) => {
        let text = 'The todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e)=>{ //on catch is if callback fails
                    done(e);
                })
            })
    });
    it('should not create todo with bad body data', (done)=>{
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            //.expect((res)=>{
            //    expect(res.body.text).toBe(text);
            //})
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(4);
                    //expect(todos[0].text).toBe(text);
                    done();
                }).catch((e)=>{ //on catch is if callback fails
                    done(e);
                })
            })
    });
    describe('GET /todos', () =>{
        it('should get all todos', (done) => {
            request(app)
                .get('/todos')
                .expect(200)
                .expect((res) => {
                    expect(res.body.todos.length).toBe(4)
                })
                .end(done)
        });
    })
});