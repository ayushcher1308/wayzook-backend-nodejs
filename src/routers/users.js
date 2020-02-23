const express = require('express')
const User = require('../users/users')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/users/new',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }
    catch(e){
        res.status(400).send({err:e})
    }
})

router.get('/users/authenticate',auth,async (req,res)=>{
    res.send(req.user)
})

router.get('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token!=req.token
        })
        await req.user.save()
        res.send({msg:"Logout Successful"})
    }
    catch(e){
        res.status(401).send({
            msg:e
        })
    }
})

router.get('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens =[]
        await req.user.save()
        res.send({msg:"Logout Successful"})
    }
    catch(e){
        res.status(401).send({
            msg:e
        })
    }
})

router.post('/users/login',async (req,res)=>{
    try{    
        const user = await User.checkCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }
    catch(e){
        res.status(400).send({
            msg:"Invalid User Name or password"
        })
    }
})

module.exports = router