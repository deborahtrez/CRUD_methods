const express = require('express')
const customer = require('./customer') //import database
const app = express()
const ourApi = require('./api/ourApi') //import api
const bodyParser = require('body-parser')

//use method sets and imports the URL for the router
//app.use('/api/customer' , require('./api/ourApi'))
app.use('/api/customer' , ourApi) //use will take in arguments: the database and API.

app.listen(3000, () =>{
    console.log('server is running')
})

app.use(bodyParser.json())