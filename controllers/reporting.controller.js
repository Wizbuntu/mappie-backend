// require Reporting model
const Reporting = require('../models/reporting')

// require express validator
const { validationResult } = require('express-validator')

// require validator
const isMongoId = require('validator/lib/isMongoId')



/**
 * Create Reporting controller
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<Object>}
 */
const createReporting = async(req, res) => {
    try {

        // get errors 
        const validationErrors = validationResult(req)

        // check if errors
        if (validationErrors['errors'].length > 0) {

            // get error
            const errorMsg = validationErrors['errors'][0].msg

            // return response
            return res.json({
                success: false,
                message: errorMsg
            })
        }


        // get reportData
        const reportData = req.body


        // create reportData
        await Reporting.create(reportData)


        // return success
        return res.json({
            success: true,
            message: "Reporting created successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}




/**
 * List Reporting controller ---ADMIN
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<Object>}
 */
const listReportingAdmin = async(req, res) => {
    try {

        // find all reporting 
        const reports = await Reporting.find({}).sort({ createdAt: 'desc' })


        // return reporting
        return res.json({
            success: true,
            data: reports
        })


    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}




/**
 * List Reporting with isPending = false --- WEBSITE
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<Object>}
 */
const listReporting = async(req, res) => {
    try {

        // find all reporting with isPending false
        const reports = await Reporting.find({ isPending: false }).sort({ createdAt: 'desc' })


        // return reporting
        return res.json({
            success: true,
            data: reports
        })


    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}





/**
 * Update Reporting 
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<Object>}
 */
const updateReporting = async(req, res) => {
    try {

        // get errors 
        const validationErrors = validationResult(req)

        // check if errors
        if (validationErrors['errors'].length > 0) {

            // get error
            const errorMsg = validationErrors['errors'][0].msg

            // return response
            return res.json({
                success: false,
                message: errorMsg
            })
        }


        // get reportId
        const reportId = req.params.reportId

        // get status 
        const isPending = req.body.isPending


        // check if is a mongoId
        if (!isMongoId(reportId)) {
            return res.json({
                success: false,
                message: "Invalid report id"
            })
        }


        // find Report with mongoId
        const report = await Reporting.findOne({ _id: reportId })


        // check if not report
        if (!report) {
            return res.json({
                success: false,
                message: "Report data with id does not exist"
            })
        }



        // update isPending
        report.isPending = isPending


        // save report
        await report.save()



        // return success
        return res.json({
            success: true,
            message: "Report updated successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}








/**
 * Delete Reporting 
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<Object>}
 */
const deleteReporting = async(req, res) => {
    try {

        // get reportId
        const reportId = req.params.reportId

        // check if is a mongoId
        if (!isMongoId(reportId)) {
            return res.json({
                success: false,
                message: "Invalid report id"
            })
        }


        // find report by Id and delete
        await Reporting.findOneAndDelete({ _id: reportId })


        // return success
        return res.json({
            success: true,
            message: "Report deleted successfully"
        })


    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}







// export 
const reportingController = {
    createReporting,
    listReportingAdmin,
    listReporting,
    updateReporting,
    deleteReporting
}



// export 
module.exports = reportingController