const express = require("express");
const UserModel = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../Config/generateToken");


const loginController = expressAsyncHandler(async(req,res)=>{
    const { name,password } = req.body
    const user = await UserModel.findOne({name});
    console.log("fetched user data",user);
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }
    else{
        res.status(401);
        throw new Error("Invalid Username or Password");
    }
});


const signupController = expressAsyncHandler (async (req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        res.send(400);
        throw Error("Please Fill all the Fields !!");
    }

    const userExist = await UserModel.findOne({email});
    if(userExist){
        throw Error("User Already Exists !!");
    }

    const usernameExist = await UserModel.findOne({name});
    if(userExist){
        throw Error("User-name Already Exists !!");
    }
     
    const user = await UserModel.create({name,email,password})

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user.id)
        })
    }
    else{
        res.status(400);
        throw new Error("Sign Up Unsuccessful");
    }
});

const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await UserModel.find(keyword).find({
      _id: { $ne: req.user._id },
    });
    res.send(users);
  });

module.exports = {loginController, signupController,fetchAllUsersController};
