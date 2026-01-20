import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './Config/db.js';
dotenv.config();
import foodRoute from './Routes/foodRoutes.js'
import userRouter from './Routes/userRoute.js'
import helpingHand from './Routes/helpingHandRoute.js'
import cartRouter from './Routes/cartRoute.js'
import orderROuter from './Routes/orderRoute.js';
import contactRoute from './Routes/contactRoute.js'
import helpUsersRouter from './Routes/helpUsersRouter.js'

//app config
const app = express();
const port = process.env.PORT || 3000

//middleware set
app.use(express.json())
app.use(cors()) // used t help connect backend to frontend



//Conection
connectDB().then(()=>{
    
    //api
    app.use("/api/foods",foodRoute) 
    app.use("/api/HelpingHand/foods",helpingHand) 
    app.use('/images',express.static('src/uploads'))  // this specifuy the cc uploads  file name 
    app.use('/api/user',userRouter)
    app.use('/api/cart',cartRouter)
    app.use('/api/order',orderROuter)
    app.use('/api/contact',contactRoute)
    app.use('/api/helpuser',helpUsersRouter)
    
    //making sure only after database is connected ,
    //the serverr starts to run
    app.listen(port ,()=>{
    console.log(`The Server is Running on ${port}`)
})
    
})




