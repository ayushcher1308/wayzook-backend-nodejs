const express = require('express')
const tours = require('../tours/tours')
const router = new express.Router()
const mongoose = require('mongoose')

router.post('/newTour',async (req,res)=>{
    const newTour = new tours(req.body)
    await newTour.save()
    res.send({
        tour:newTour,
        msg:"Added Successfully"
    })
})

router.get('/tour/:id',async (req,res)=>{
    const _id = req.params.id
    if(mongoose.Types.ObjectId.isValid(_id)){
    tours.findOne({_id}).populate('placeInfo').exec(function(err, users) {
        if(err){
            res.status(401).send({
                status:401,
                name:"Not Found"
            })
        }
        //this will log all of the users with each of their posts 
        else{
            res.status(200).send(
               users
            )
        }
      }) 
    }
    
})

module.exports = router