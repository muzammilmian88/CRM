// for register user
const mongoose=require("mongoose");

const EmployeeSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const employeemodel=mongoose.model("employees", EmployeeSchema);

module.exports=employeemodel;