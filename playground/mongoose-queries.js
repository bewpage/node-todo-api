const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// const id = '5a031b575920eef454d073ca11';
//
// if(!ObjectId.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//    _id: id
// }).then((todos) => {
//     console.log(`Todos ${todos}`);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log(`Todo ${todo}`);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('ID not found');
//     }
//     console.log(`Todo By Id ${todo}`)
// }).catch((e) => console.log(e));

const userId = '5a02c944d74a99e5634b7e55';

User.findById(userId).then((user) => {
    if(!user){
        return console.log('User not found');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => {
   console.log(e)
});
