const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const StudentRoutes=require("./routes/StudentRoutes")
const TeacherRoutes=require("./routes/TeacherRoutes");
const courseRoutes=require("./routes/courseRoutes");

app.use(express.json());

dotenv.config();

mongoose.connect('mongodb+srv://muzammilmian88:74769977mian@cluster0.uxiostd.mongodb.net/?retryWrites=true&w=majority').then(()=>{

 console.log("connected succesfully");
 app.listen(process.env.PORT || 8000, (err)=>{
   if(err){
    console.log("Error while connecting to Database")
    console.log(err);
   }else{
    console.log("running succesfully at", process.env.PORT)
   }

 });

}).catch((error)=>{

console.log("error",error);
});


// app.use("/api/user",userRoutes)

app.use(StudentRoutes,TeacherRoutes,courseRoutes);