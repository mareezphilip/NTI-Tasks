const router = require("express").Router()
const userController = require("../controller/user.controller")
//post method
router.get("/add", userController.add)
router.post("/add", userController.addLogic)


//all users
router.get("/", userController.showAll)
//single user
router.get("/show/:userId", userController.showSingle)
//edit user


//delete user
router.get("/delete/:userId", userController.del)

router.get("/available" ,userController.showavailable)
router.get("/unavailable" , userController.showunavailable)


router.get("/statusun/:userId" , userController.makeunavailable)
router.get("/statusa/:userId" , userController.makeavailable)
module.exports = router
