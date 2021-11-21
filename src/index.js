const express = require('express')
const User = require('./models/user')
const Place = require('./models/place')
const Travelhistory = require('./models/travelhistory')
const Reportplace = require('./models/reportplace')
const userRouter = require('./Router/user')
const placeRouter = require('./Router/place')
const travelHistoryRouter = require('./Router/travelhistory')
const reportplaceRouter = require('./Router/reportplace')



const app = express()

require('./db/mongoose')


const port = process.env.PORT || 3000
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())
app.use(userRouter)
app.use(placeRouter)
app.use(travelHistoryRouter)
app.use(reportplaceRouter)


app.listen(port ,()=>{

    console.log('Server is on port ' + port)

})