const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const designationSchema = new Schema({
    designationid:{
        type: String,
        required: false,
    },
    designationname:{
        type: String,
        required: false,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },

})


module.exports = mongoose.model('Designation', designationSchema);