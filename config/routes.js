const express=require('express')
const router=express.Router()
const usersController=require('../app/controllers/UsersController')
const authenticateUser=require('../app/middlewares/authentication')

router.post('/register',usersController.register)
router.post('/login',usersController.login)
router.get('/account',authenticateUser,usersController.account)
router.delete('/logout',authenticateUser,usersController.logout)

module.exports=router