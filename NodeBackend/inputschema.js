const mongoose = require('mongoose');
const inputschema=new mongoose.Schema({
    input_text:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Users', inputschema);