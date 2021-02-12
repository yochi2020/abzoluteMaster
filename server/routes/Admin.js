const router = require('express').Router()
const AdminControllerMSL = require("../controller/AdminControllerMSL")
const AdminControllerUser = require('../controller/AdminControllerUser')

router.get("/allow/:allow/:reson/:name",AdminControllerMSL.sendDisAllowed)
router.get("/register",AdminControllerUser.registerUser)



module.exports = router