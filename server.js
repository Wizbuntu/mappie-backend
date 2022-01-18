// require app
const app = require('./app')

// require dotenv
const dotenv = require('dotenv')

// require mongoose
const mongoose = require('mongoose')


// invoke dotenv config
dotenv.config()




// connect to db
mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@testcuster.ss5et.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Bitke Test Database connected successfully")
    })
    .catch((error) => {
        console.log(error)
    })








// init PORT
const PORT = process.env.PORT || 7002
app.listen(PORT, () => {
    console.log(`Bitke mappie server started on port ${PORT}`)
})