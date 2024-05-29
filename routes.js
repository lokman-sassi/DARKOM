// import express from 'express';
// import { createUser, loginUser } from './controller.js';
const express =require("express")
const userController = require("./controller")
const dataController=require('./dateController')
const router = express.Router();


router.post('/signup',userController.createUser);
router.post('/login', userController.loginUser);
router.get('/listings',dataController.fetchData)

module.exports=router;