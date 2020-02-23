require('./db/mongoose')
const express = require('express')

const placeRouter = require('./routers/places')
const toursRouter = require('./routers/tours')
const usersRouter = require('./routers/users')
const couponRouter = require('./routers/coupon')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(placeRouter)
app.use(toursRouter)
app.use(usersRouter)
app.use(couponRouter)

app.listen(port,()=>{
    console.log('wayzook api is up on port '+port)
})