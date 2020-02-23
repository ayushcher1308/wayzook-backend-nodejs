const mongoose = require ('mongoose')

const couponSchema = new mongoose.Schema({
    coupon:{
        type:String,
        uppercase:true,
        required:true,
        unique:true,
        trim:true
    },
    discountPercent:{
        type:Number,
        required:true
    },
    maxDiscount:{
        type:Number,
        required:true
    },
    validTill:{
        type:Date,
        min:Date.now(),
        required:true
    },
    validTours:{
        type:Array
    }
})

couponSchema.statics.checkCoupon = async function(coupon){
    const result = await Coupon.findOne({coupon})
    console.log(result)
    if(!result){
        throw new Error("Coupon not valid")
    }
    return result
}

const Coupon = mongoose.model('coupons',couponSchema)
module.exports = Coupon