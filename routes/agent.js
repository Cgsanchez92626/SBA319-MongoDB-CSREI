// AGENT CRUD Routes
const express = require('express')
const router = express.Router()
const Agent = require('../models/agent')

// Index route = GET
router.get('/', async (req, res)=> {
    const allAgents = await Agent.find({})
          res.json(allAgents)
        })

//Show GET ID get individual agent
router.get('/:id', async (req, res) => {
    try {
    const oneAgent = await Agent.findById(req.params.id)
    res.json(oneAgent)
} catch (error) {
    res.status(500).json({msg: "Whoops something went wrong in oneAgent!!"})
    console.log(error)
}})

//New  - GET - Form

//Create - POST
router.post("/", async (req, res)=> {
    console.log(req.body)
    const newAgent = await Agent.create(req.body)
    res.json(newAgent)
})

// Edit Route - GET FOrm

// Update - PUT/PATCH
router.put('/:id', async (req, res) => {
    const updateAgent = await Agent.findByIdAndUpdate(req.params.id, req.body)
    res.json(updateAgent)
})


//Destroy route - DELETE
router.delete('/:id', async (req, res) => {
    const deleteAgent = await Agent.findByIdAndDelete(req.params.id)
    res.json(deleteAgent)
})


module.exports = router