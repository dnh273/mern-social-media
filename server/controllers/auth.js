const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/')
const Token = require('../models/Token')
// REGISTER USER
const register = async (req, res) => {

    const {
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        occupation,
    } = req.body

    const emailIsAlreadyExits = await User.findOne({ email })

    if (emailIsAlreadyExits) {
        throw new CustomError.NotFoundError('Email already exists')
    }

    // first registered user is an admin
    const isFirstAccount = (await User.countDocuments({})) === 0

    const role = isFirstAccount ? 'admin' : 'user'


    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        role,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
    });
    const saveUser = await newUser.save()
    res.status(StatusCodes.CREATED).json(saveUser)
}

// LOGGING IN
const login = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email: email })
    if (!user) {
        throw new CustomError.NotFoundError('Email does not exist')
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials.' })
    }

    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
    const refreshToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' })

    const ip = req.ip;
    const userAgent = req.headers['user-agent'];
    const userToken = { refreshToken, ip, userAgent, user: user._id };
    Token.create(userToken)
    delete user.password;
    res.status(StatusCodes.OK).json({ accessToken, refreshToken, user });

}

const logout = async (req, res) => {
    await Token.findOneAndDelete({ user: req.user.userId });

    res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
}

module.exports = { register, login, logout }