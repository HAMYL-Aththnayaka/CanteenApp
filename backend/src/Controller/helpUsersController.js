import helpingUser from '../Models/helpingUsers.js'

export const ViewHelp = async(req,res)=>{
    try{
        const result = await helpingUser.find({})
        if (result){
            res.status(200).send({
                Data:result,
                success:true
            })
        }
    }catch(err){
        console.log(err.toString())
        res.status(500).send({
            success:false,
            alert:err.toString()
        })
    }
}
export const deleteHelp = async(req,res)=>{
    try{
        const id = req.params.id
        const remove = await helpingUser.findByIdAndDelete(id);
        if(remove){
            res.status(200).send({
                alert:"removed",
                success:true
            })
        }else{
            res.status(404).send({
                alert:err.toString(),
                success:false
            })
        }
        
    }catch(err){
        res.status(500).send({
            success:false,
            alert:err.toString()
        })
    }
}