const mongoose = require('mongoose');
const db = {
    localhost: 'mongodb://localhost:27017/TodoApp',
    // mlab: 'mongodb://todo-api:todoapi-2017@ds251435.mlab.com:51435/todo-api'
};

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || db.localhost);

module.exports = {mongoose};