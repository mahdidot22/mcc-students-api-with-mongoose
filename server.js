'use strict';

const mongoose = require('mongoose');
const dbUrl = "mongodb+srv://mahid:mahdi123456@myfirstcluster.ikygk.mongodb.net/edu?retryWrites=true&w=majority"
const std = require('./models/student');
const exp = require('express');
const app = exp();
var bodyParser = require('body-parser');
app.use(exp.json());
app.use(bodyParser.urlencoded({extended:false}));
console.log("wellcome to node js");


mongoose.connect(dbUrl).then((result)=>{
    console.log("connected to database!")
});

var listener = app.listen(process.env.PORT, function(){
console.log('Listening on port ' + listener.address().port);
});


app.post("/student",addStd);
app.get("/students",getAllStds);
app.get("/student",getStd);
app.patch("/student",updateStd);
app.delete("/student",deleteStd);
app.delete("/students",deleteAllStds)

function addStd(req,res){
    let stdObject = new std({firstName:req.body.firstName, lastName:req.body.lastName, stdid:req.body.stdid});
    stdObject.save();
    res.send("Student has been added!")
}

function getAllStds(req, res){
    std.find({}).then((students)=>{
        res.send(students);
    });
  
}

function getStd(req, res){
    std.findById({_id:'618a8c22a952e71270e7ced2'}).then((student)=>{
        res.send(student);
    });
}


function updateStd(req,res){
    var update = {
        "firstName" : req.body.firstName,
        "lastName" : req.body.lastName,
        "stdid" : req.body.stdid
    }
    std.findByIdAndUpdate('618adf70933f4052db6c79ae', update).then((student)=>{
        res.send("Student has been updated!");
    });
}

function deleteStd(req,res){
    std.findByIdAndDelete('618adf70933f4052db6c79ae').then((student)=>{
        res.send("Student has been deleted!");
    });
}

function deleteAllStds(req,res){
    std.deleteMany({}).then(()=>{
        res.send("All Students has been deleted!");
    })
    /*std.remove({}).then(()=>{
        res.send("All Students has been deleted!");
        //deprecated
    })*/
}