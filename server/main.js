require('dotenv').config();
require('express-async-errors');
// express

const express = require('express');

// rest of the package
const cors = require('cors');
const multer = require('multer');
const helmet = require('helmet');
const mongoose = require('mongoose')
const morgan = require('morgan');
const path = require('path');
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/users.js')
const postRoutes = require('./routes/posts.js')
const connectDB = require('./db/connect');
const { register, logout } = require('./controllers/auth');
const { createPost } = require('./controllers/posts')
const verifyToken = require('./middleware/auth');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandleMiddleware = require('./middleware/error-handle');
const User = require('./models/User')
const Post = require('./models/Post')
const { users, posts } = require('./data/index')

/* MIDDLEWARE*/


const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('assets', express.static(path.join(__dirname, 'public/assets')));
app.use(express.static('public/'))
/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });


// ROUTER WITH FILES
app.post('auth/register', upload.single('picture'), register);
app.post('posts', verifyToken, upload.single('picture'), createPost)
app.get('auth/logout', verifyToken, logout)


// ROUTES
app.use("auth", authRoutes)
app.use("users", userRoutes)
app.use('posts', postRoutes)

app.use(notFoundMiddleware)
app.use(errorHandleMiddleware)



/* MONGOOSE SETUP*/

const PORT = 6001 || process.env.PORT;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, () => {
            console.log(`PORT : ${PORT}`);
            // ADD DATA ONE TIME
            // User.insertMany(users)
            // Post.insertMany(posts)
        });
    } catch (error) {
        console.log('error' + error);
    }
};

start()