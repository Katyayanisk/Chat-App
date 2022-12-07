const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/auth');

const User = require('../models/user');


const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "secret-key", {expiresIn: "30d"});
};

module.exports = generateToken;

router.route("/").get(protect, async (req,res)=>{
    let searchQuery = {
        name: { $regex: req.query.search, $options: "i" }
    }
    if (!searchQuery){
        searchQuery = {};
    }
  const users = await User.find(searchQuery).find({ _id: { $ne: req.user._id } })
  res.send(users);
});

router.route("/:email").get(protect, async (req,res)=>{
  const email = req.params.email;
  const users = await User.findOne({email:email});
  if (!users){
    res.send(null);
  }
  res.json(users);
});




router.route("/").post(async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
  
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Not Filled all the values");
    }
  
    const user = await User.findOne({ email:email });
  
    if (user) {
      //res.status(400);
      res.send(null);
    }
  
    const new_user = await User({name:name,email:email,password:password});
    new_user.save();
  
    if (new_user) {
      res.json({_id: new_user._id,name: new_user.name,email: new_user.email,token: generateToken(new_user._id)});
    } 
    else {
      res.status(400);
      throw new Error("User not found");
    }
  });


router.post("/login", async (req, res) => {
    const email = req.body.email
    const password = req.body.password;

  try{
    const user = await User.findOne({ email:email, password:password });
    console.log("Logged in")
    res.json({_id: user._id,name: user.name,email: user.email,token: generateToken(user._id)});
  } 
  catch(error) {
    res.send(null);
  }
});

module.exports = router;