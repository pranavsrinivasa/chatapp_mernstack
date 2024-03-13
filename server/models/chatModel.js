const mongoose = require("mongoose");

const chatModel = mongoose.Schema({
    chatName : {type: String},
    boolGroup : {type: Boolean},
    userArray : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }
    ],
    latestMessage : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
    },
    groupAdmin : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
    }
},{
    timeStamp : true,
    
});

const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;