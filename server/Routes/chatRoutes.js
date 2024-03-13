const express = require("express");
const {
    accessChat,
    fetchChats,
    createGroupChat,
    groupExit,
    fetchGroups,
  } = require("../Controllers/chatController");
  const { protect } = require("../Middleware/authMiddleware");
  
  const router = express.Router();
  
  router.route("/").post(protect, accessChat);
  router.route("/").get(protect, fetchChats);
  router.route("/createGroup").post(protect, createGroupChat);
  router.route("/fetchGroups").get(protect, fetchGroups);
  router.route("/groupExit").put(protect, groupExit);
  
  module.exports = router;