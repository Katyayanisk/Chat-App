const express = require("express");

const { protect } = require("../middleware/auth");
const Chat = require('../models/chat');


const router = express.Router();

router.route("/").post(protect, async (req, res) => {
    const userid = req.body.userid;
  
    if (!userid) {
      console.log("userid not found");
      return res.sendStatus(400);
    }
  
    let isChat = await Chat.find({ isGroupChat: false, $and: [ { users: { $elemMatch: { $eq: req.user._id } } }, { users: { $elemMatch: { $eq: userid } } } ] }).populate("users");
  
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } 
    else {
      let new_chat = new Chat({chatName: "sender", isGroupChat: false, users: [req.user._id, userid]});
  
      try {
        new_chat.save();
        console.log(new_chat._id);
        const chat = await Chat.findOne({ _id: new_chat._id }).populate("users");
        console.log(chat);
        res.status(200).json(chat);
      } 
      catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  });


router.route("/").get(protect, async (req, res) => {

    try {
      Chat.find({ users: { $elemMatch: { $eq: req.user._id } } }).populate("users").sort({ updatedAt: -1 }).then(async (results) => { 
                res.status(200).send(results)
        });
    }

    catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
    
  })

router.route("/:chatId").delete(protect, async (req,res) =>{

  const chatId = req.params.chatId;

  const chat = await Chat.findOneAndDelete({_id: chatId});
  res.send(chat);



})

module.exports = router