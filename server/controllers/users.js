const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

// READ

const getAllUsers = async (req, res) => {

    const users = await User.find({ role: 'user' })
    const admin = await User.find({ role: 'admin' })
    const AdminId = JSON.stringify(admin[0]._id)

    const isAdmin = AdminId === JSON.stringify(req.user.id)

    if (isAdmin) {
        res.status(StatusCodes.OK).json(users)
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: `Permission denied` })
    }

}

const getUser = async (req, res) => {

    const { id } = req.params;
    const user = await User.findById(id);
    res.status(StatusCodes.OK).json(user)

}

const getUserFriends = async (req, res) => {

    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
        user.friends.map(id => User.findById(id))
    )

    const formattedFriend = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath }
        }
    )

    res.status(StatusCodes.OK).json(formattedFriend)

}

const delUser = async (req, res) => {

    const { id } = req.params
    const user = await User.findById(id);

    const admin = await User.find({ role: 'admin' })
    const AdminId = JSON.stringify(admin[0]._id)

    const isAdmin = AdminId === JSON.stringify(req.user.id)

    if (!isAdmin) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Permission denied' })
    }

    res.status(StatusCodes.OK).json({ message: `UserID ${id} was deleted successfully` })
}

// const updateUser = async (req, res) => {
//     try {
//         const { id } = req.params
//         const user = await User.findById(id);

//         const admin = await User.find({ role: 'admin' })
//         const AdminId = JSON.stringify(admin[0]._id)

//         const isAdmin = AdminId === JSON.stringify(req.user.id)


//     } catch (error) {
//         res.status(StatusCodes.NOT_FOUND).json({ message: error.message })
//     }
// }

const addRemoveFriend = async (req, res) => {

    const { id, friendId } = req.params
    console.log(id, friendId);
    const user = await User.findById(id)
    const friend = await User.findById(friendId)

    if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter(id => id !== friendId)
        friend.friends = friend.friends.filter(id => id !== id)
    } else {
        user.friends.push(friendId)
        friend.friends.push(id)
    }
    await user.save()
    await friend.save()

    const friends = await Promise.all(
        user.friends.map(id => User.findById(id))
    )

    const formattedFriend = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath }
        }
    )

    res.status(StatusCodes.OK).json(formattedFriend)


}

module.exports = { addRemoveFriend, getAllUsers, getUser, getUserFriends, delUser }