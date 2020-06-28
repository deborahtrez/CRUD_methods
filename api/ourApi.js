const express = require('express')
const customer = require ('../customer')
const uuid = require('uuid')


const router = express.Router()

//.GET method reads from the database (displays them in postman)
router.get('/', (request, response) =>{
    response.json(customer)
})

router.get('/:id', (request, response) =>{
    response.json(customer.filter(singleCustomer => 
        singleCustomer.id === parseInt(request.params.id)
        //parseInt(request.params.id) change to integer, the id parameters of the request
    ))
})

//We used POST to create new items in our database
router.post('/' , (request, response ) => {
    const newObject = {
      id:uuid.v5,
      name:request.body.name,
      location:request.body.location,
   }
   if (!newObject.name || !newObject.location) {
    return response.status(400).json()
  }
  
  //push is used to append a new object to an array and still keep the original array
  customer.push(newObject)
  response.json(customer)
})

//We will Use PUT to update already existing items in the Database
router.put('/:id', (request, response) =>{
    const searchCustomer = customer.some( (singleCustomer) =>
        singleCustomer.id === parseInt(request.params.id)
    )
    if (searchCustomer ) {
        //we shall store the data from the body of the request in the variable 'detailUpdated'
        const detailUpdated = request.body
        customer.forEach(singleCustomer => {
            if(singleCustomer.id === parseInt(request.params.id)){
                singleCustomer.name = detailUpdated.name ? detailUpdated.name : singleCustomer.name
                singleCustomer.location = detailUpdated.location ? detailUpdated.location : singleCustomer.location
                
                response.json({alert : "Update done successfully", singleCustomer:singleCustomer})
            }
        })
    } //you could choose to use 'else' instead of return
    return response.status(400).json({alert: 'not successful'})
})

module.exports = router