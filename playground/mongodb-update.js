const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return ('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //findOneAndUpdate()
    db.collection('Todos').findOneAndUpdate({_id: new ObjectID('59fb5d8411e7459efe1245b1')}, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to fetch Todos', err);
    });

    db.collection('Users').findOneAndUpdate({_id: new ObjectID('59fb5d8411e7459efe1245b2')}, {
        $set: {name: 'Bartek'},
        $inc: {age: +1}
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to fetch Todos', err);
    });



    // db.close();
});