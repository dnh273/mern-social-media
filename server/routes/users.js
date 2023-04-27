const express = require('express')
const { getUser, getUserFriends, addRemoveFriend, getAllUsers, delUser } = require('../controllers/users')
const verifyToken = require('../middleware/auth')


const router = express.Router()

// READ
router.get('/', verifyToken, getAllUsers)
router.get('/:id', verifyToken, getUser)
router.get('/:id/friends', verifyToken, getUserFriends)

// UPDATE
router.patch('/:id/:friendId', verifyToken, addRemoveFriend)

// DELETE
router.delete('/:id', verifyToken, delUser)

module.exports = router