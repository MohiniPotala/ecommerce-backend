
const user_model=require("../models/user.model")
const jwt=require("jsonwebtoken")
const auth_config=require("../configs/auth.config")



const verifySignUpBody=async (req,res,next)=>{
    try{
     if(!req.body.name)
        {
            return res.status(400).send({
            message:"Failed! name was not provided in request body"
            })
        }
      if (!req.body.email) {
        return res.status(400).send({
          message: "Failed! email was not provided in request body",
        });
      }

      if (!req.body.userId) {
        return res.status(400).send({
          message: "Failed! userID was not provided in request body",
        });
      }

      const user= await user_model.findOne({userId: req.body.userId})
      if(user)
        {
            return res.status(400).send({
                message:"Failed! user with same userId is already present"
            })
        }
        next()
    }
    catch(err){
        console.log("Error while validating the request object",err)
        res.status(500).send({
            message:"Error while validating the request body"
        })
    }
}

const verifySignInBody=async (req,res,next)=>{
    if(!req.body.userId)
        {
            return res.status(400).send({
                message:"userId is not provided"
            })
        }

        if(!req.body.password)
            {
                return res.status(400).send({
                    message:"password is not provided"
                })
            }

            next()
}


const verifyToken= (req,res,next)=>{
    const token=req.headers['x-access-token']
    if(!token){
        res.status(403).send({
            message:"no token found :unauthorised"
        })
    }

    jwt.verify(token, auth_config.secret,async (err,decoded)=>{
        if(err){
            return res.status(401).send({
                message:"unauthorised"
            })
        }
        const user=await user_model.findOne({userId:decoded.id})
       if(!user)
        {
            return res.status(400).send({
                message:"Unauthorised,this user for token doesnt exist"
            })
        }
        req.user=user
    next()
    });
}

const isAdmin=(req,res,next)=>{
    const user=req.user
    if(user && user.userType=="ADMIN")
    {
        next()
    }
    else
    {
        res.status(403).send({
            message:"only ADMIN users are allowed to use this"
        })
    }
}

module.exports={
    verifySignUpBody:verifySignUpBody,
     verifySignInBody:verifySignInBody,
     verifyToken:verifyToken,
     isAdmin:isAdmin
}