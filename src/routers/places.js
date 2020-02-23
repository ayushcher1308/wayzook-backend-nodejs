const express = require('express')
const places = require('../places/places')
const router = new express.Router()
const mongoose = require('mongoose')


router.get('/place/:id',async (req,res)=>{
    const _id = req.params.id
    if(mongoose.Types.ObjectId.isValid(_id)){
    const place = await places.findOne({_id})
    if(!place){
        res.status(404).send({
            status:401,
            name:"Not Found"
        })
    }
    res.send(place)}
    else{
        res.status(404).send({
            status:401,
            name:"Not Found"
        })
    }
})

router.get('/placesAll',async (req,res)=>{
    const place = await places.find({})
    if(!place){
        res.status(404).send({
            status:404,
            name:"Not Found"
        })
    }
    res.send(place)
})

router.post('/createPlace',async (req,res)=>{
    const newPlace = new places(req.body)
    await newPlace.save((err)=>{
        console.log(err)
        if(err){
            res.status(401).send({
                msg:err.errmsg
            })
        }
       else{
        res.status(201).send({
            place:newPlace,
            msg:"Added Succesfully"
        })
       }
    })
    
})

module.exports = router
