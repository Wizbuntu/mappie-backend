// require Metadata model
const MetaData = require('../models/metadata')

// require Category model
const Category = require('../models/category')

// require express validator
const { validationResult } = require('express-validator')

// require isMongo
const isMongoId = require('validator/lib/isMongoId')



/**
 * Create Metadata
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<Object>}
 */
const createMetaData = async(req, res) => {
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


        // get metadata
        const _metaData = req.body


        // find category by categoryId
        const category = await Category.findOne({ _id: _metaData.categoryId })


        // check if not category
        if (!category) {
            return res.json({
                success: false,
                message: `Category with id ${_metaData.categoryId} does not exist`
            })
        }


        // create metadata
        await MetaData.create(_metaData)


        // return success
        return res.json({
            success: true,
            message: "Metadata created successfully"
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
 * Fetch all metadata by category Id
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<Object>}
 */
const metadataByCategory = async(req, res) => {
    try {

        // get categoryId
        const categoryId = req.params.categoryId


        // check if categoryId is a mongoId
        if (!isMongoId(categoryId)) {
            return res.json({
                success: false,
                message: "Invalid category Id"
            })
        }


        // find metadata by categoryId
        const metadatas = await MetaData.find({ categoryId: categoryId })


        // return 
        return res.json({
            success: true,
            data: metadatas
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
 * Fetch all metadata 
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<Object>}
 */
const fetchAllMetaData = async(req, res) => {
    try {


        // fetch all metadata
        const metadatas = await MetaData.find({})


        // return success
        return res.json({
            success: true,
            data: metadatas
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}




// init metadataController
const metaDataController = {
    createMetaData,
    metadataByCategory,
    fetchAllMetaData
}



// export 
module.exports = metaDataController