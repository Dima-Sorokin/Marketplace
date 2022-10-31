const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const productSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    name:{
        type:String,
        require: true
    },
    description:{
        type:String,
        require:false
    },
    qty:{
        type:Number,
        require:true
    },
    price:{
        type:Number,
        require:true
    }

},{timestamps:true});
module.exports = mongoose.model(`Product`,productSchema);