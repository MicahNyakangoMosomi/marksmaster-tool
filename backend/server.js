// step: importing the necessary modules and components 
import { connectDB } from "./config/connect_database.js"
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'


// step: configuring dotenv
dotenv.config()


// step: app = express() and making json run in our app
const app = express()
app.use(express.json())


// step: cors to allow our frontend access
app.use(cors({
  origin:process.env.FRONTEND_URL,
  methods:['GET','POST','PUT','DELETE'],
  credentials: true
}))


// step: implenting routes in our app
app.use('/',(req,res)=>{
  res.send("Hello this is the EDU+ server ")
})


// step: run the server 
app.listen(5000,()=>{
  //Connect the DB
  connectDB()
  console.log('Server Running on port 3000')
})

