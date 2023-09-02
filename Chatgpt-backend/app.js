const express = require("express");
const {QuestionRouter} = require("./Router/Question.router")
const {connection} = require("./config/db")
let app = express()
app.use(express.json())


app.use("/Question",QuestionRouter)

const port = process.env.PORT || 5000;

app.listen(port, async()=>{
  try{

   await connection()
    
  }catch(err){


  }
  console.log(`server is running on ${port}`)
});