import mongoose from "mongoose";

export const connectDB = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("MongoDB connetced")
    
  } catch (error) {
    console.log("Error connecting to MongoDB",error)
    process.exit(1)
    
  }
}
