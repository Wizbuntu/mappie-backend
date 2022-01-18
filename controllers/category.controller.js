// require Category model
const Category = require('../models/category')

// require express validator
const { validationResult } = require('express-validator')

// require validator
const isMongoId = require('validator/lib/isMongoId')








/**
 * Create category
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<Object>}
 */
const createCategory = async(req, res) => {
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

        // init categoryData
        const categoryData = req.body


        // create Category
        await Category.create(categoryData)


        // return success
        return res.json({
            success: true,
            message: "Category created successfully"
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
 * Fetch all category
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<Object>}
 */
const fetchCategories = async(req, res) => {
    try {

        // init cateogories
        const categories = await Category.find({})


        // return success
        return res.json({
            success: true,
            data: categories
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
 * Fetch single category
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<Object>}
 */
const fetchSingleCategory = async(req, res) => {
    try {

        // get categoryId
        const categoryId = req.params.categoryId

        // check if category is a valid mongo id
        if (!isMongoId(categoryId)) {
            return res.json({
                success: false,
                message: "Invalid category Id"
            })
        }

        // find category by id
        const category = await Category.findOne({ _id: categoryId })


        // check if not category
        if (!category) {
            return res.json({
                success: false,
                message: `Category with id ${categoryId} does not exist`
            })
        }


        // return success
        return res.json({
            success: true,
            data: category
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
 * Update single category
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<Object>}
 */
const updateCategory = async(req, res) => {
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

        // get categoryId
        const categoryId = req.params.categoryId

        // get categoryData
        const categoryData = req.body


        // check if category is a valid mongo id
        if (!isMongoId(categoryId)) {
            return res.json({
                success: false,
                message: "Invalid category Id"
            })
        }


        // find category by id
        const category = await Category.findOne({ _id: categoryId })


        // check if not category
        if (!category) {
            return res.json({
                success: false,
                message: `Category with id ${categoryId} does not exist`
            })
        }


        // update category
        category.title = categoryData.title
        category.slug = categoryData.slug
        category.formSchema = categoryData.formSchema



        // save category
        await category.save()


        // return success
        return res.json({
            success: true,
            message: "Category updated successfully"
        })


    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}



// init categoryController
const categoryController = {
    createCategory,
    fetchCategories,
    fetchSingleCategory,
    updateCategory
}




// export 
module.exports = categoryController