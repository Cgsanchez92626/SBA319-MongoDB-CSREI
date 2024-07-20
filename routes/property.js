// PROPERTY CRUD Routes
const express = require('express')
const router = express.Router()
const Property = require('../models/property')

// Index route = GET and 
// GET Route for filtering property by zipcode
router.get('/', async (req, res) => {
    try {
        const { zipcode } = req.query;

        if (zipcode) {
            const filteredProperties = await Property.find({ zipcode: zipcode });
            if (!filteredProperties) {
                // console.log(`Property not found for ID: ${req.params.id}`);
                // console.log(`Response status: ${res.statusCode}`); // Log the response status
                return res.status(404).json({ msg: 'No Properties found for zipcode' });
            }
            res.json(filteredProperties);
        } else {
            const allProperties = await Property.find({});
            res.json(allProperties);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//Show GET ID get individual property
router.get('/:id', async (req, res) => {
    try {
    const oneProperty = await Property.findById(req.params.id)

    // Check if oneProperty is null or undefined (document not found)
    if (!oneProperty) {
        // console.log(`Property not found for ID: ${req.params.id}`);
        // console.log(`Response status: ${res.statusCode}`); // Log the response status
        return res.status(404).json({ msg: 'Property not found' });
    }
    res.json(oneProperty)
   
  } catch (error) {
    res.status(500).json({msg: "Whoops something went wrong in oneProperty!!"})
    console.log(error)
}})

//New  - GET - Form

//Create - POST
router.post("/", async (req, res)=> {
    console.log(req.body)
    const newProperty = await Property.create(req.body)
    res.json(newProperty)
})

// Edit Route - GET FOrm

// Update - PUT/PATCH
router.put('/:id', async (req, res) => {
    const updateProperty = await Property.findByIdAndUpdate(req.params.id, req.body)
    res.json(updateProperty)
})


//Destroy route - DELETE
router.delete('/:id', async (req, res) => {
    const deleteProperty = await Property.findByIdAndDelete(req.params.id)
    res.json(deleteProperty)
})


module.exports = router