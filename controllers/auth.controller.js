// require User model
const User = require('../models/user')

// require express validator
const { validationResult } = require('express-validator')

// require bcrypt 
const bcrypt = require('bcryptjs')

// require jsonwebtoken
const jwt = require('jsonwebtoken')





/**
 * Register/Create Account controller
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<Object>}
 */
const createAccount = async(req, res) => {
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


        // get accountData
        const accountData = req.body


        // find user with email
        const user = await User.findOne({ email: accountData.email })


        // check if user
        if (user) {
            return res.json({
                success: false,
                message: "User with email already exist"
            })
        }

        // salt 
        const salt = await bcrypt.genSalt(10)

        // hash
        const hash = await bcrypt.hash(accountData.password, salt)

        // copy accountData and update password
        const userDTO = {...accountData, password: hash }


        // create user 
        await User.create(userDTO)

        // return success
        return res.json({
            success: true,
            message: "User created successfully"
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
 * Login User controller
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<Object>}
 */
const loginUser = async(req, res) => {
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


        // get loginData
        const loginData = req.body


        // find user with email
        const user = await User.findOne({ email: loginData.email })


        // check if no user
        if (!user) {
            return res.json({
                success: false,
                message: "Invalid email or password"
            })
        }


        // check if user is not admin
        if (!user.isAdmin) {
            return res.json({
                success: false,
                message: "Invalid email or password"
            })
        }


        // compare password
        const isMatch = await bcrypt.compare(loginData.password, user.password)


        // check if not isMatch
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid email or password"
            })
        }

        // generate token
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET)


        // return success
        return res.json({
            success: true,
            data: token
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
 * Verify controller
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<Object>}
 */
const verifyAuthUser = async(req, res) => {
    try {

        // return success
        return res.json({
            success: true,
            data: req.user
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}













// init authController
const authController = {
    createAccount: createAccount,
    loginUser: loginUser,
    verifyAuthUser: verifyAuthUser
}





// export 
module.exports = authController