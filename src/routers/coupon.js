const express = require('express')
const Coupon = require('../coupons/coupon')
const router = new express.Router()
const Tour = require('../tours/tours')
const auth = require('../middleware/auth')

router.post('/coupon/add',auth, async (req, res) => {
    if(req.user.role != "admin"){
        res.send({
            msg:"You are not authorised to add a coupon"
        })
    }
    else{
        const newCoupon = new Coupon(req.body)
        try {
            await newCoupon.save()
            res.send(newCoupon)
        }
        catch (e) {
            res.status(401).send({
                msg: "Coupon is already present or validity is not correct.",
                err:e
            })
        }
    }
})

router.post('/coupon/check', async (req, res) => {
    try {
        const couponName = req.body.coupon
        const name = await Coupon.findOne({ "coupon": couponName })
        if (!name) {
            res.status(401).send({
                valid: false,
                msg:"This is not a valid coupon"
            })
        }
        else {
            if (!name.validTours.includes(req.body.tour)) {
                res.status(401).send({
                    valid: false,
                    msg: "Coupon is not applicable for this tour"
                })
            }
            else if (new Date(name.validTill)<new Date()) {
                res.status(401).send({
                    valid: false,
                    msg: "Coupon is expired"
                })
            }
            else {
                const _id=req.body.tour
                const tour = await Tour.findOne({_id})
                var discount = Math.floor(tour.price*name.discountPercent/100)
                var finalAmount = (discount>name.maxDiscount)?(tour.price-name.maxDiscount):(tour.price-discount)
                res.send({ valid: true,
                    finalAmount:finalAmount,
                discount:tour.price-finalAmount })
            }
        }
    }
    catch (e) {
        res.send({
            valid: false,
            msg:"This is not a valid coupon"

        })
    }
})


module.exports = router