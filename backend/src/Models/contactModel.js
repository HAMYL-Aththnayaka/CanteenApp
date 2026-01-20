
import mongoose from 'mongoose'


const ConatactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    registration:{

        type:String,
        required:true
    },
    faculty:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    recomendation:{
        type:String,
        required:true
    },
    scholership:{
        type:[String],
        required:true
    }
})

const contactModel = mongoose.models.ContactAdmin || mongoose.model('ContactAdmin',ConatactSchema);

export default contactModel