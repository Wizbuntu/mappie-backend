// require mongoose
const mongoose = require('mongoose')

// init schema
const Schema = mongoose.Schema


// init categorySchema
const categorySchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true
    },
    slug: {
        type: Schema.Types.String,
        required: true
    },
    formSchema: {
        type: [{ name: { type: Schema.Types.String }, label: { type: Schema.Types.String }, type: { type: Schema.Types.String }, element: { type: Schema.Types.String } }]
    }
}, { strict: false, timestamps: true })


// create CategoryModel
const CategoryModel = mongoose.model('Category', categorySchema)


// export 
module.exports = CategoryModel