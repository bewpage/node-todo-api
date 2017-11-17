require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

//****************

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(__dirname + '/../'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'index.html'));
});

//*****************

app.post('/todos', authenticate, (req, res) => {
    let todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', authenticate, (req, res) => {
   Todo.find({
       _creator: req.user._id
   }).then((todos) => {
       res.send({todos});
   })
}, (e) => {
    res.status(400).send(e);
});


//GET /todos/12345
app.get('/todos/:id',authenticate, (req, res) => {
   const id = req.params.id;

    if(!ObjectId.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });


});

app.delete('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;

    if(!ObjectId.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
       if(!todo){
           return res.status(404).send();
       }
       res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })

});


app.patch('/todos/:id',authenticate, (req, res) => {
    const id = req.params.id;
    //create object of things that user can update
    const body = _.pick(req.body, ['text', 'completed']);

    //validation the ID
    if(!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });

});

//POST /users
app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e.message);
    });
});


//Middleware function for authenticate
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

//POST /users/login {email, password}
app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const email = body.email;
    const password = body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        })
    }).catch((e) =>{
        console.log();
        res.status(400).send(e);
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});


module.exports = {app};
