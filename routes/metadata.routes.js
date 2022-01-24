// require express Router
const router = require('express').Router()

// require metaDataController
const {
    createMetaData,
    metadataByCategory,
    fetchAllMetaData,
    deleteMetaData,
    searchMetaData
} = require('../controllers/metadata.controller')

// require express validator
const { check } = require('express-validator')


// require verifyAuth
const verifyAuth = require('../middleware/verifyAuth')


// create metaData route ----- [POST]
router.post('/create/metadata',
    verifyAuth,
    check("categoryId").notEmpty().withMessage("Category ID is required").bail().isMongoId().withMessage("Category id type mismatch"),
    check("country").notEmpty().withMessage("Country is required").bail().isString().withMessage("Country type mismatch"),
    check("latitude").notEmpty().withMessage("Latitude is required").bail().isNumeric().withMessage("Latitude type mismatch"),
    check("longitude").notEmpty().withMessage("Longitude is required").bail().isNumeric().withMessage("Longitude type mismatch"),
    createMetaData)



// Fetch metaData by category Id
router.get('/metadata/category/:categoryId', verifyAuth, metadataByCategory)


// fetch all metadata ---- [GET]
router.get('/all/metadata', verifyAuth, fetchAllMetaData)



// search metaData
router.get('/search/metadata', verifyAuth, searchMetaData)


// delete metaData
router.delete('/delete/metadata/:metadataId', verifyAuth, deleteMetaData)











//export
module.exports = router