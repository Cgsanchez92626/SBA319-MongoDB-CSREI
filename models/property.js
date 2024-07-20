const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    county: {
        type: String
    },
    parcelNumber: {
        type: String,
        validate: {
            validator: function(v) {
                if (v === "") return true; // Allow empty string
                // Check if the parcel number matches the allowed format
                return /^\d{4}-\d{3}-\d{3}$/.test(v);
            },
            message: props => `${props.value} is not a valid parcel number format! Must be in the format "9999-999-999"`
        }
    },
    yearBuilt: {
        type: Number,
        validate: {
            validator: function(v) {
                // Check if v is not empty and is a number
                if (v === "") return true; // Allow empty string
                return /^\d{4}$/.test(v.toString()); // Check if it's a 4-digit number
            },
            message: props => `${props.value} is not a valid Year format! Must be a 4-digit number`
        }
    },
    propertyType: {
        type: String,
        enum: ['Single-Family', 'Multi-Family', 'Mix-Use'],
        required: true
    }
     
});

const Property = mongoose.model('Property', propertySchema)

module.exports =  Property;