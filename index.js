const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const todoModle = require(',/models/todoModel');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const { updateOne } = require('./modles/todoModels');

const app = express();
//middlew
app.use(bodyParser.json());
//route
app.get('/todos/',(req,res)=>{
    res.send('we are in the root folder');

});
app.patch('/todos/:todoId',async(res ,req)=>{
    try{
   const updateTodo= await todoModle.findOneAndUpdate({_id:req.params,todoId },{$set:{status:req.body.status}});
    res.json({
        data:updateTodo,
        message:'Todo successfully updated'
    });
}
});

//delete atodo
app.delete('/todos/todoId',async(res,req)=>{
    try{
        const deleteTodoo=await todoModel.findOneAndDelete({_id:req.params.todoId});
        res.json({data:deleteTodoo,
            message:'Todo successfully delete'
        });
    }catch(err){
        res,json({message:err});
    }
});
app.post('/',async (req,res)=>{
    const todo = todoModel.create({
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        endDate: req.body.endDate,
    });
    try{
        const createTodo = await todo.save();
        res.json({
            Data:createTodo,
            message:"todo successfully created",
            status:true
        });
    }catch(err){

        res.json({message:err});
    }
});
app.get('/compeleted_todo',(req,res)=>{
  //  res.send("we are in the completed todo folder");

try{
    const getTodo = await todoModel.find();
    res.json({
        message:'Todo successfully retrieved',
    });
}catch(err){
    res.json({message:err});
}
});

//get a par
app.get('/todos/',async(req,res)=>{
    try{
        const getTodo = await todoModle.find();
        res.json({
            message:'Todos successfully retrieved ',
            data:getTodo,
        })
    }catch(error){
        res.json({
            message:console.error()
        });
    }
});
app.get('/getApp',(req,res)=>{
    res.send("waaw")
}),

//database connection
mongoose.connect(process.env.db_url,()=>console.log('successfully connected'));

// port to listen to requests
app.listen(process.env.PORT_NUMBER || 2021);