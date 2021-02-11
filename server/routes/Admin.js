const router = require('express').Router()
const AdminController = require("../controller/AdminController")


router.get("/allow/:allow/:reson/:name",AdminController.sendDisAllowed)



module.exports = router