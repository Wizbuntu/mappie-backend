// require express
const express = require('express')

// require helmet
const helmet = require('helmet')

// require cors
const cors = require('cors')

// require category routes
const categoryRoutes = require('./routes/category.routes')

// require metaDataRoutes
const metadataRoutes = require('./routes/metadata.routes')

// require authRoutes
const authRoutes = require('./routes/auth.routes')

// require reportingRoutes
const reportingRoutes = require('./routes/reporting.routes')

// init app
const app = express()





// MIDDLEWARES
app.use(helmet())

app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.use(express.json())




// ROUTES
app.use('/v1/api', categoryRoutes)
app.use('/v1/api', metadataRoutes)
app.use('/v1/api', authRoutes)
app.use('/v1/api', reportingRoutes)





// export
module.exports = app