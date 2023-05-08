const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userid:{
        type: String,
        required: false
    },
    emailid:{
        type:String,
        required:false
    },
    username:{
        type: String,
        required: false,
    },
    password:{
        type: String,
        required: [true, 'Please enter your password'],
        select:false
    },
    designation:{
        type: String,
        required: false
    },
    mobilenumber:{
        type: Number,
        required:false
    },
    othermobilenumber:{
        type: Number,
        required: false
    },
    profileimage:{
        type: String,
        required: false,
    },
    remarks: {
        type: String,
        required: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    },

})


module.exports = mongoose.model('User', userSchema);