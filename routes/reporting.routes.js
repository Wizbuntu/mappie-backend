// require router
const router = require('express').Router()

// require express validator
const { check } = require('express-validator')

// require reportingController
const { createReporting, listReporting, listReportingAdmin, updateReporting, deleteReporting } = require('../controllers/reporting.controller')

// require verifyAuth 
const verifyAuth = require('../middleware/verifyAuth')




// create reporting --- [POST]
router.post('/create/reporting',
    check('country').notEmpty().withMessage("Country is required"),
    check('latitude').notEmpty().withMessage("Latitude is required").bail().isNumeric().withMessage("Latitude must be a number"),
    check('longitude').notEmpty().withMessage("Longitude is required").bail().isNumeric().withMessage("Longitude must be a number"),
    check('fullName').notEmpty().withMessage("Full name is required"),
    check('title').notEmpty().withMessage("Title is required"),
    check('description').notEmpty().withMessage("Description is required"),
    createReporting)





// Fetch all reporting ---- [GET] [ADMIN]
router.get('/all/reporting', verifyAuth, listReportingAdmin)


// Fetch reporting ---- [GET][WEBSITE]
router.get('/reporting', listReporting)


// Update reporting ---- [PUT]
router.put('/update/reporting/:reportId', verifyAuth,
    check('isPending').notEmpty().withMessage("Is pending is required").bail().isBoolean().withMessage("Is pending type mismatch"),
    updateReporting)





// Delete Reporting --- [DELETE]
router.delete('/delete/reporting/:reportId', verifyAuth, deleteReporting)


// export
module.exports = router