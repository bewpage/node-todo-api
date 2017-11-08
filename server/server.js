const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

const Todo = mongoose.model('Todo', {
   text: {
       type: String,
       required: true,
       minlength: 1,
       trim: true
   },
   completed: {
       type: Boolean,
       default: false
   },
    completedAt: {
       type: Number,
        default: null
    }
});


let newTodo = new Todo({
    text: 'new todo'
});

newTodo.save().then((doc) => {
    console.log(`Saved todo: ${doc}`);
}, (err) => {
    console.log('Unable to save todo', err);
});

let otherTodo = new Todo({
    text: 'buy a grocery',
    completed: true,
    completedAt: Number(Math.round(new Date().getTime())/1000)
});

otherTodo.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
    console.log('Unable to save todo');
});

const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

let newUser = new User({
   email: 'abc@abc.com'
});

newUser.save().then((doc) => {
   console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
    console.log(`Unable to save user ${err}`)
});