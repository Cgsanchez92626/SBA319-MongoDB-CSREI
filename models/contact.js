const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    contact_type: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        // Add a custom validator for email format
        validate: {
            validator: function(v) {
                if (v === "") return true; // Allow empty string
                // Regex pattern to validate an email address
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                if (v === "") return true; // Allow empty string
                // Check if the phone number matches any of the allowed formats
                return /^\d{3}-\d{3}-\d{4}$/.test(v) || /^\d{1,3}-\d{3}-\d{3}-\d{4}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number format! Must be in the format "999-999-9999" or "9-999-999-9999"`
        }
    },
    last_contact_dt: {
        type: Date,
        validate: {
            validator: function(v) {
                if (v === "") return true; // Allow empty string
                return /^\d{4}-\d{2}-\d{2}$/.test(v.toISOString().slice(0, 10));
            },
            message: props => `${props.value} is not a valid date format! Must be in the format "yyyy-mm-dd"`
        }
    }

});

const Contact = mongoose.model('Contact', contactSchema)

module.exports =  Contact;