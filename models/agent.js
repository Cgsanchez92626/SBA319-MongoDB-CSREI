const mongoose = require('mongoose')

const agentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        // Add a custom validator for email format
        validate: {
            validator: function(v) {
                // Regex pattern to validate an email address
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    }
});

const Agent = mongoose.model('Agent', agentSchema)

module.exports =  Agent;