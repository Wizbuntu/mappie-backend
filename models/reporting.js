// require mongoose
const mongoose = require('mongoose')

// init schema
const Schema = mongoose.Schema



// init ReportingSchema
const ReportingSchema = new Schema({
    country: {
        type: Schema.Types.String,
        required: true
    },
    latitude: {
        type: Schema.Types.Number,
        required: true
    },
    longitude: {
        type: Schema.Types.Number,
        required: true
    },
    fullName: {
        type: Schema.Types.String,
        required: true
    },
    title: {
        type: Schema.Types.String,
        required: true
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    author: {
        type: Schema.Types.String,
        required: false
    },
    date: {
        type: Schema.Types.Date,
        required: false,
    },
    isPending: {
        type: Schema.Types.Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })


// create model
const Reporting = mongoose.model("Reporting", ReportingSchema)



// export Reporting model
module.exports = Reporting