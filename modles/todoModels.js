const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
title: {
    type: String,
    required : true
},
body:{
    type : String,
    required:true
},
status:{
type : Boolean,
default:false,
requireed:true
},
endDate:{
type:String,

required:true
}

});
module.exports = mongoose.model('todoModle',todoSchema);