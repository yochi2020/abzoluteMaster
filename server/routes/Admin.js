const router = require('express').Router()
const AdminControllerMSL = require("../controller/AdminControllerMSL")
const AdminControllerUser = require('../controller/AdminControllerUser')

router.get("/allow/:allow/:reason/:fullName",AdminControllerMSL.sendDisAllowed)
router.post("/register",AdminControllerUser.registerUser)
router.post("/deleteuser",AdminControllerUser.deleteUser)
router.post("/change",AdminControllerUser.changeUser)

module.exports = router