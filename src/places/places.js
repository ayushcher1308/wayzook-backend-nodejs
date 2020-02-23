const mongoose = require('mongoose')

const placesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    description:{
        type:String,
    },
    visaRequired:{
        type:Boolean,
        required:true   
    } 
},{
    versionKey:false
})

// placesSchema.virtual('place',{
//     ref:'tours',
//     localField:'_id',
//     foreignField:'placeInfo'
// })

placesSchema.methods.getPlace = async function(){
    const place = await Place.findOne({_id})
    if(!place){
        throw new Error('Place not found')
    }

    return place
}

const Place = mongoose.model('places',placesSchema)
module.exports = Place