// CONTACT CRUD Routes
const express = require('express')
const router = express.Router()
const Contact = require('../models/contact')

// Index route = GET
router.get('/', async (req, res)=> {
    const allContacts = await Contact.find({})
          res.json(allContacts)
        })

//Show GET ID get individual contact
router.get('/:id', async (req, res) => {
    try {
    const oneContact = await Contact.findById(req.params.id)
    res.json(oneContact)
} catch (error) {
    res.status(500).json({msg: "Whoops something went wrong in oneContact!!"})
    console.log(error)
}})

//New  - GET - Form

//Create - POST
router.post("/", async (req, res)=> {
    console.log(req.body)
    const newContact = await Contact.create(req.body)
    res.json(newContact)
})

// Edit Route - GET FOrm

// Update - PUT/PATCH
router.put('/:id', async (req, res) => {
    const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body)
    res.json(updateContact)
})


//Destroy route - DELETE
router.delete('/:id', async (req, res) => {
    const deleteContact = await Contact.findByIdAndDelete(req.params.id)
    res.json(deleteContact)
})


module.exports = router