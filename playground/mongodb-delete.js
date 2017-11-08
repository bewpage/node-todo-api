const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return ('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch').then((result) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(result, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // **** deleteOne() method
    // db.collection('Todos').deleteOne({
    //     text: 'Eat lunch'
    // }).then((result) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(result, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    //findOneAndDelete()
    db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to fetch Todos', err);
    });

    // db.close();
});