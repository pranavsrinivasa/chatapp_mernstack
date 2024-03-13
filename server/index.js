const express = require("express");

const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const app = express();
dotenv.config();
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
const connectdb = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("Server is connected");
    }
    catch(err){
        console.log("Server connection failed",err.message);       
    }
};
connectdb();

app.get("/", (req,res)=>{
    res.send("API Demo");
})
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message",messageRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log("SERVER IS UP....."));

const io = require("socket.io")(server,{
    cors:{
        origin:"*",
    },
    pingTimeout: 60000,
});