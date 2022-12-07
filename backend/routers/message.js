const express = require("express");
const { protect } = require("../middleware/auth");
const Message = require('../models/message');
const User = require('../models/user');
const router = express.Router();

router.route("/:chatId").get(protect, async (req, res) => {
    try {
      let messages = await Message.find({ chat: req.params.chatId }).populate("sender", "name email").populate("chat");
      res.json(messages);
    } 
    catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
});

router.route("/").post(protect, async (req, res) => {
    const content = req.body.content; 
    const chatId  = req.body.chatId;
  
    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
  
  
    try {
      let new_message = new Message({sender: req.user._id, content: content, chat: chatId });
      new_message.save();
  
      new_message = await new_message.populate("sender", "name");
      console.log(new_message);
      new_message = await new_message.populate("chat");


      new_message = await User.populate(new_message, {
        path: "chat.users",
        select: "name email",
      });
  
      res.json(new_message);

    } 
    catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });

module.exports = router;