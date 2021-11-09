let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let studentSchema = new Schema({
    firstName:String,
    lastName:String,
    stdid:Number
});

let Std = mongoose.model("Std",studentSchema);
module.exports = Std;