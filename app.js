// require express
const express = require('express')

// require helmet
const helmet = require('helmet')

// require cors
const cors = require('cors')

// require category routes
const categoryRoutes = require('./routes/category.routes')

// require metaDataRouter 
const metadataRouter = require('./routes/metadata.routes')


// init app
const app = express()





// MIDDLEWARES
app.use(helmet())

app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.use(express.json())




// ROUTES
app.use('/v1/api', categoryRoutes)
app.use('/v1/api', metadataRouter)





// export
module.exports = app