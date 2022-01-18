// require express Router
const router = require('express').Router()

// require metaDataController
const {
    createMetaData,
    metadataByCategory,
    fetchAllMetaData
} = require('../controllers/metadata.controller')

// require express validator
const { check } = require('express-validator')


// create metaData route ----- [POST]
router.post('/create/metadata',
    check("categoryId").notEmpty().withMessage("Category ID is required").bail().isMongoId().withMessage("Category id type mismatch"),
    check("country").notEmpty().withMessage("Country is required").bail().isString().withMessage("Country type mismatch"),
    check("latitude").notEmpty().withMessage("Latitude is required").bail().isNumeric().withMessage("Latitude type mismatch"),
    check("longitude").notEmpty().withMessage("Longitude is required").bail().isNumeric().withMessage("Longitude type mismatch"),
    createMetaData)



// Fetch metaData by category Id
router.get('/metadata/category/:categoryId', metadataByCategory)


// fetch all metadata ---- [GET]
router.get('/all/metadata', fetchAllMetaData)


//export
module.exports = router