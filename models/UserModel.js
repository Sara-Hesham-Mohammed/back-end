const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: 'String',
        required: true
    },
    password: {
        type: 'String',
        required: true
    },
    name: {
        type: 'String',
        required: true
    }
});

const UserModel = model('user', UserSchema);

module.exports = UserModel; 

