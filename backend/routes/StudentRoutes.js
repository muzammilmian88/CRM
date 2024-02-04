const express = require('express');

const User=require("../models/userModel");


const router=express.Router();


//create user
router.post("/student/", async (req,res)=>{
    const {name,email,age}=req.body;
  try{
      
    const userAdded= await User.create({name:name, email:email, age:age});
    res.status(201).json(userAdded);
    console.log("User Added successfully")
  } catch(error){
    console.log("Error while adding User!!")
    console.log(error);
    res.status(400).json({error:error.message});
  
  }
  
  });


  
  
  //get all users
  router.get("/student/",async (req,res)=>{
    
    try{
      const showAll= await User.find();
    //   console.log(showAll)
      res.status(200).json(showAll);
      console.log("All User Fatched Succesfully")
      
    }
    catch(error){
      console.log("Error while geting all users")
      console.log(error);
      res.send(500).json({error:error.message})
  
    }
      // res.send("Api is runinggggggg")
  });

    //get single user
    router.get("/student/:id",async (req,res)=>{
      const {id} = req.params;
        try{
          const singleUser= await User.findById({_id : id});
        //   console.log(showAll)
          res.status(200).json(singleUser);
          console.log("single User Fatched Succesfully")
          
        }
        catch(error){
          console.log("Error while geting single users")
          console.log(error);
          res.status(500).json({error:error.message})
      
        }
         
      });


      // delete
      router.delete("/student/:id",async (req,res)=>{
        const {id} = req.params;
          try{
            const singleUser= await User.findByIdAndDelete({_id : id});
          //   console.log(showAll)
            res.status(200).json(singleUser);
            console.log("single User Deleted Succesfully")
            
          }
          catch(error){
            console.log("Error while deleting single users")
            console.log(error);
            res.send(500).json({error:error.message})
        
          }
            // res.send("Api is runinggggggg")
        });

          // update put patch
      router.patch("/student/:id",async (req,res)=>{
        const {id} = req.params;
        const {name,email,age}=req.body;
          try{
            const updateUser= await User.findByIdAndUpdate(id, req.body, {new:true,});
          //   console.log(showAll)
            res.status(200).json(updateUser);
            console.log(" User updated Succesfully")
            
          }
          catch(error){
            console.log("Error while upadting users")
            console.log(error);
            res.send(500).json({error:error.message})
        
          }
            // res.send("Api is runinggggggg")
        });
    
  module.exports=router;