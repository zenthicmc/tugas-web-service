"use strict"

const express = require('express')
const router = express.Router()
const userController = require('../../src/controllers/UserController')

router.get('/user', userController.show)
router.get('/user/:id', userController.detail)
router.post('/user', userController.store)
router.put('/user/:id', userController.update)
router.delete('/user/:id', userController.destroy)

module.exports = router