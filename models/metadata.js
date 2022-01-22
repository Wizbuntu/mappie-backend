// require mongoose
const mongoose = require('mongoose')

// init schema
const Schema = mongoose.Schema




// init metadataSchema
const metadataSchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    categoryName: {
        type: Schema.Types.String,
        required: true
    },
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
    data: {
        type: Schema.Types.Mixed
    }
}, { timestamps: true, strict: false })


// add index
metadataSchema.index({ country: 'text', categoryName: "text", categoryId: "text" })

// create model
const MetaData = mongoose.model("MetaData", metadataSchema)


// export 
module.exports = MetaData