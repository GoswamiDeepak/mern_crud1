const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: 'String',
    },
    usermobile: {
        type: 'String',
    },
    useremail: {
        type: 'String',
    },
    useraddress: {
        type: 'String',
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
