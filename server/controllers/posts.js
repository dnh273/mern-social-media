const Post = require('../models/Post')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

// CREATE
const createPost = async (req, res) => {

    const { userId, description, picturePath } = req.body
    const user = await User.findById(userId)
    const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user.picturePath,
        picturePath,
        likes: {},
        comments: []
    })

    await newPost.save()

    const post = await Post.find()
    res.status(StatusCodes.CREATED).json(post)
    // } catch (err) {
    //     res.status(409).json({ message: err.message })
    // }
}

const getFeedPosts = async (req, res) => {

    const post = await Post.find()
    res.status(StatusCodes.OK).json(post)
    // } catch (err) {
    //     res.status(409).json({ message: err.message })
    // }
}

const getUserPosts = async (req, res) => {

    const { userId } = req.params;
    const post = await Post.find({ userId })
    res.status(StatusCodes.OK).json(post)
    // } catch (err) {
    //     res.status(409).json({ message: err.message })
    // }
}

// UPDATE
const likePost = async (req, res) => {

    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id)
    const isLiked = post.likes.get(userId)

    if (isLiked) {
        post.likes.delete(userId)
    } else {
        post.likes.set(userId, true)
    }

    const updatedPost = await Post.findByIdAndUpdate(
        id,
        { likes: post.likes },
        { new: true }
    )
    res.status(StatusCodes.OK).json(updatedPost)
    // } catch (err) {
    //     res.status(409).json({ message: err.message })
    // }
}

module.exports = { createPost, getFeedPosts, getUserPosts, likePost }