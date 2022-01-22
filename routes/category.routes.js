// router
const router = require('express').Router()

// category controller
const {
    createCategory,
    fetchCategories,
    fetchSingleCategory,
    updateCategory,
    deleteCategory,
    searchCategory
} = require('../controllers/category.controller')

// require express validator
const { check } = require('express-validator')



// create category route ---- [POST]
router.post('/create/category',
    check('title').notEmpty().withMessage("Title is required").bail().isString().withMessage("Title type mismatch"),
    check('slug').notEmpty().withMessage("Slug is required").bail().isSlug().withMessage("Invalid slug"),
    check('formSchema').notEmpty().withMessage("Form schema is required").bail().isArray().withMessage("Form schema type mismatch"),
    createCategory)



// fetch all categories --- [GET]
router.get('/all/categories', fetchCategories)


// fetch single category ---- [GET]
router.get('/category/:categoryId', fetchSingleCategory)


// update single category --- [PUT]
router.put('/update/category/:categoryId',
    check('title').notEmpty().withMessage("Title is required").bail().isString().withMessage("Title type mismatch"),
    check('slug').notEmpty().withMessage("Slug is required").bail().isSlug().withMessage("Invalid slug"),
    check('formSchema').notEmpty().withMessage("Form schema is required").bail().isArray().withMessage("Form schema type mismatch"),
    updateCategory)






// delete category --- [DELETE]
router.delete('/delete/category/:categoryId', deleteCategory)



// search category ---- [GET]
router.get('/search/category', searchCategory)

// export
module.exports = router