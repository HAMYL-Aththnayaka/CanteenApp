import mongose from 'mongoose'

const helpUser = new mongose.Schema({
    name:{
        type:String,
        required:true
    },
    registration:{
        type:String,
        required:true
    }
})
const heluserModel= mongose.model.helpUser || mongose.model('helpUser',helpUser);

export default  heluserModel