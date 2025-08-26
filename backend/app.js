const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
require("dotenv").config();

connect()
.then(res =>{
    console.log("succesfully connected")
})
.catch((err) =>{
    console.log(err);
});
 

async function connect(){
return await mongoose.connect(
  "mongodb+srv://syedabdulrahman9505:Syed0987@cluster0.seyfqnm.mongodb.net/"
);
}


//initialize express app
const app = express();

//middleware
app.use(cors()); //enable corse
app.use(express.json()); // parse json request bodies

//basic health-check route
app.get('/api/ping',(req,res)=>{
    res.status(200).json({message:'pong'});
});

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on post ${PORT}`);
    
});

