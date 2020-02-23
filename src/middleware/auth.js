const jwt = require('jsonwebtoken')
const User = require('../users/users')

const auth = async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,'wontTellYou')
        const user = await User.findOne({_id:decoded._id,'tokens.token':token})
        if(!user){
            throw new Error("Invalid token please enter valid token")
        }
        req.token = token
        req.user = user
        next()
    }
    catch(error){
        res.status(201).send({
            msg:"Please Authenticate"
        })
    }
}

module.exports = auth