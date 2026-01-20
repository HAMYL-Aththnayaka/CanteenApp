import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const mongo_URI =process.env.mongo_URI



export const  connectDB= async()=>{
    await mongoose.connect(mongo_URI).then(()=>{
        console.log(`The DB Connected`)
    })}