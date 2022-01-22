// require jsonwebtoken 
const jwt = require('jsonwebtoken')

// require User model
const User = require('../models/user')






// init verifyAuth
const verifyAuth = async(req, res, next) => {
    try {

        // get token
        const token = req.headers.authorization

        // check if not token
        if (!token) {
            return res.json({
                success: false,
                message: "Invalid or expired token"
            })
        }


        // verify auth
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)


        // find user in db
        const user = await User.findOne({ _id: decoded.id, email: decoded.email, isAdmin: true })


        // if not user
        if (!user) {
            return res.json({
                success: false,
                message: "Invalid or expired token"
            })
        }


        // add user to req object
        req.user = { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName }


        // invoke next method
        next()

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}








// export
module.exports = verifyAuth