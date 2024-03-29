const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Users = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
    const  userId  = req.body;
    console.log(userId);

    if(!userId){
        console.log("UserId was not sent during the request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        boolGroup: false,
        $and : [
            { userArray: {$elemMatch: {$eq: req.user._id}}},
            { userArray: {$elemMatch: {$eq: userId}}},
        ],
    })
     .populate("userArray","-password")
     .populate("latestMessage");

    isChat = await Users.populate(isChat,{
        path: "latestMessage.sender",
        select: "name email",
    });

    if(isChat.length>0){
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName : "sender",
            boolGroup : false,
            userArray : [req.user._id,userId],
        };
        try{
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({_id: createdChat._id}).populate(
                "userArray","-password"
            )
            res.status(200).json(FullChat);
        } catch(error){
            res.status(400);
            throw new Error(error.message);
        }
    }
});

const fetchChats = asyncHandler(async (req, res) => {
    try {
      console.log("Fetch Chats aPI : ", req);
      Chat.find({ userArray: { $elemMatch: { $eq: req.user._id } } })
            .populate("userArray", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await Users.populate(results, {
                    path: "latestMessage.sender",
                    select: "name email",
                });
                res.status(200).send(results);
            });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });
  
  const fetchGroups = asyncHandler(async (req, res) => {
    try {
      const allGroups = await Chat.where("boolGroup").equals(true);
      res.status(200).send(allGroups);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });
  
  const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
      return res.status(400).send({ message: "Data is insufficient" });
    }
  
    var users = JSON.parse(req.body.users);
    console.log("chatController/createGroups : ", req);
    users.push(req.user);
  
    try {
      const groupChat = await Chat.create({
        chatName: req.body.name,
        userArray: users,
        boolGroup: true,
        groupAdmin: req.user,
      });
  
      const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate("userArray", "-password")
        .populate("groupAdmin", "-password");
  
      res.status(200).json(fullGroupChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });
  
  const groupExit = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
  
    // check if the requester is admin
  
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { userArray: userId },
      },
      {
        new: true,
      }
    )
      .populate("userArray", "-password")
      .populate("groupAdmin", "-password");
  
    if (!removed) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(removed);
    }
  });


  const addSelfToGroup = asyncHandler(async (req,res)=>{
    const {chatId, userId} = req.body;

    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: {userArray: userId},
      },
      {
        new: true,
      },
    )
      .populate("userArray","-password")
      .populate("groupAdmin","-password");
    if(!added){
      res.status(404);
      throw new Error("Chat not found");
    }else{
      res.json(added);
    }
  });
  
  module.exports = {
    accessChat,
    fetchChats,
    fetchGroups,
    createGroupChat,
    groupExit,
    addSelfToGroup,
  };