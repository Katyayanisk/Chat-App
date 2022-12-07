const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');

const userRouter = require('./routers/user');
const chatRouter = require('./routers/chat');
const messageRouter = require('./routers/message');



const port = 5000

const url = "mongodb+srv://chatapp:chatapp@cluster0.uuetzel.mongodb.net/test"

mongoose.connect(url).then(()=>{
    console.log("Database created")
}).catch((error) => {
    console.log(error)
})

app.use(express.json())
app.use(cors());

app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })