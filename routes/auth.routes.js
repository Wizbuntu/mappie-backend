// require router
const router = require('express').Router()

// require auth controller
const { createAccount, loginUser, verifyAuthUser } = require('../controllers/auth.controller')

// require express validator
const { check } = require('express-validator')


// require verifyAuth 
const verifyAuth = require('../middleware/verifyAuth')


// Create Account Route ---- [POST]
router.post('/create/account',
    check('firstName').notEmpty().withMessage("First name is required").bail().isString().withMessage("First name type mismatch"),
    check('lastName').notEmpty().withMessage("Last name is required").bail().isString().withMessage("Last name type mismatch"),
    check('email').notEmpty().withMessage("Email is required").bail().isEmail().withMessage("Please enter a valid email"),
    check('password').notEmpty().withMessage("Password is required"),
    createAccount
)



// Login User Route ---- [GET]
router.post('/login',
    check('email').notEmpty().withMessage("Email is required").bail().isEmail().withMessage("Please enter a valid email"),
    check('password').notEmpty().withMessage("Password is required"),
    loginUser
)



// verify user route --- [GET]
router.get('/verify/auth/user', verifyAuth, verifyAuthUser)







// export
module.exports = router