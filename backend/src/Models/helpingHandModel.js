import mongoose from 'mongoose'


const HelpingfoodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{

        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    catagory:{
        type:String,
        required:true
    },
     canteen:{
        type:String,
        required:true
    }
})

const helpingHandModel = mongoose.models.HelpingfoodSchema || mongoose.model('helpingHand',HelpingfoodSchema);

export default helpingHandModel