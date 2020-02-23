const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please Enter a valid email address")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        trim:true
    },
    age:{
        type:Number,
        required:true,
        validator(value){
            if(value<1){
                throw new Error("Age is not valid")
            }
        }
    },
    role:{
        type:String,
        required:true,
        default:"user"
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},{
    versionKey:false
})

userSchema.methods.toJSON = function(){
    const user = this
    const obj = user.toObject()

    delete obj.password
    delete obj.tokens
    return obj
}

userSchema.statics.checkCredentials = async function(email,password){
    const result = await User.findOne({email})
    if(!result){
        throw new Error("Invalid User ID or password")
    }
    // console.log()
    const isMatch = await bcrypt.compare(password,result.password)
    if(!isMatch){
        throw new Error("Invalid User ID or password")
    }

    return result

}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'wontTellYou')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token

}

userSchema.pre('save',async function(next){
    const user = this
   if(user.isModified('password')){
      user.password = await bcrypt.hash(user.password,10)
   }
   next()
})

const User = mongoose.model('user',userSchema)
module.exports = User