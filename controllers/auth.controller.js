
const bcrypt=require("bcryptjs")
const user_model=require("../models/user.model")
const jwt=require("jsonwebtoken")
const secret=require("../configs/auth.config")


exports.signup=async (req,res)=>
    {

        const request_body=req.body;
     //const name = new type(arguments);  
       const userObj={
        name:request_body.name,
        userId:request_body.userId,
        email:request_body.email,
        userType:request_body.userType,
        password:bcrypt.hashSync(request_body.password,8)
       }
       try
       {
const user_created=await user_model.create(userObj)
const res_obj={
name:user_created.name,
userID:user_created.userId,
email:user_created.email,
userType:user_created.userType,
createdAt:user_created.createdAt,
updatedAt:user_created.updatedAt
}
res.status(201).send(res_obj)
       }
       catch(err)
       {
        console.log("Error in registering")
        res.status(500).send({
            message:"Some error has happened while registering"
        })
       }
    }


exports.signin=async(req,res)=>
    {
       const user=await user_model.findOne({userId:req.body.userId})
    
       if(user==null)
        {
          return  res.status(400).send({
                massage:"user id password is not a valid userId"
            })
        }

        const isPasswordValid=bcrypt.compareSync(req.body.password,user.password)
        if(!isPasswordValid){
           return res.status(401).send({
                message:"wrong password"
            })
        }

        const token=jwt.sign({id:user.userId},secret.secret,{
            expiresIn:120
        })


        res.status(200).send({
            name:user.name,
            userId:user.userId,
            email:user.email,
            userType:user.userType,
            accessToken:token
        })
    }