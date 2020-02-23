const mongoose = require('mongoose')

const toursSchema = new mongoose.Schema({
    tourName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    days:{
        type:Number,
        required:true
    },
    nights:{
        type:Number,
        required:true
    },
    tourDate:{
        type:Date,
        required:true
    },
    meal:{
        type:Array,
        required:true
    },
    packageInclusion:{
        type:Map,
        of:String
    },
    placeInfo:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'places'
    }  
},{
    versionKey:false
})

const tours = mongoose.model('tours',toursSchema)
module.exports = tours