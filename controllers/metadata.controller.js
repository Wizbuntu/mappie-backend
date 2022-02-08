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

        // get sort
        const sortText = req.query.sort ? req.query.sort : "desc"

        // fetch all metadata
        const metadatas = await MetaData.find({}).sort({ createdAt: sortText })


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






/**
 * Delete MetaData
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<any>}
 */
const deleteMetaData = async(req, res) => {
    try {

        // get metaDataId
        const metadataId = req.params.metadataId

        // check is mongoId
        if (!isMongoId(metadataId)) {
            return res.json({
                success: false,
                message: "Invalid metadata Id"
            })
        }


        // delete meta data 
        await MetaData.findOneAndDelete({ _id: metadataId })


        // return success
        return res.json({
            success: true,
            message: "Metadata deleted successfully"
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
 * Search MetaData
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<any>}
 */
const searchMetaData = async(req, res) => {
    try {

        // get searchText
        const searchText = req.query.search

        // search MetaData
        const metadatas = await MetaData.find({ $text: { $search: searchText } })


        // return response
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
 * Single MetaData
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<any>}
 */
const singleMetaData = async(req, res) => {
    try {

        // get id
        const id = req.params.id


        // fetch metadata by Id
        const metadata = await MetaData.findOne({ _id: id })


        // check if metadata
        if (!metadata) {
            return res.json({
                success: false,
                message: "MetaData with id does not exist"
            })
        }

        return res.json({
            success: true,
            data: metadata
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
 * Update MetaData
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<any>}
 */
const updateMetaData = async(req, res) => {
    try {

        // get metadataId
        const metadataId = req.params.metadataId


        // find metadata by id
        const metadata = await MetaData.findOne({ _id: metadataId })


        // check if no metadata
        if (!metadata) {
            return res.json({
                success: false,
                message: "Metadata does not exist"
            })

        }

        // update data
        metadata.data = req.body

        // save 
        await metadata.save()


        // return success
        return res.json({
            success: true,
            message: "Metadata updated successfully"
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
    fetchAllMetaData,
    deleteMetaData,
    searchMetaData,
    singleMetaData,
    updateMetaData
}



// export 
module.exports = metaDataController