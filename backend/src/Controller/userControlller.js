import userModel from '../Models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import dotenv from 'dotenv'
dotenv.config();

//loginuser
export const loginUser = async(req,res)=>{
    try{
        const {email , password} = req.body

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(404).send({
                success:false,

                alert:"user not found"
            })
        }

        const isMacth = await bcrypt.compare(password,user.password);
        
        if(!isMacth){
            return res.status(403).send({
                success:false,
                alert:"Password Incorect"
            })
        }
        const token = createToken(user)
        if(token){
            return res.status(200).send({
                success:true,
                token:token
            })
        }

    }catch(err){
        res.status(500).send({
            success:false,
            alert:err.toString()
        })
    }
}


const createToken =(user)=>{
    return jwt.sign(({id:user._id,name:user.name}),process.env.JWT_SECRET_KEY)
}

///registerUSer
export const registerUser = async (req, res) => {
  try {
    const { name, password, email, role } = req.body;
    
    
    if (!name || !email || !password || !role) {
      return res.status(400).send({ success: false, 
        alert: "All fields are required" 
      });
    }
    
    if (!validator.isEmail(email)) {
      return res.status(400).send({ success: 
        false,
         alert: "Please enter a valid email" 
      });
    }

    if (password.length < 8 || !password.match(/[!@#$%?^&*]/)) {
      return res.status(400).send({ success: false,
         alert: "Password must be at least 8 chars + special character"
         });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
     console.error("Email Already Taken")
      return res.status(403).send({
         success: false,
          alert: "User already exists"
         });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ 
      name, email,
       password: hashedPassword, role 
      });
    const user = await newUser.save();

   const token = jwt.sign(
  { id: user._id, name: user.name }, 
  process.env.JWT_SECRET_KEY
);


    res.status(200).send({ 
      success: true,
      token
     });
  } catch (err) {
    res.status(500).send({ 
      success: false, 
      alert: err.toString()
     });
  }
};
