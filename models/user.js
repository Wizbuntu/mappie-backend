// require mongoose
const mongoose = require('mongoose')

// init schema
const Schema = mongoose.Schema



// init UserSchema
const userSchema = new Schema({
    firstName: {
        type: Schema.Types.String,
        required: true
    },
    lastName: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    isAdmin: {
        type: Schema.Types.Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })


// create model
const User = mongoose.model("User", userSchema)



// export User model
module.exports = User