const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const passport = require("passport");

const userRouter = require('./routes/userRoutes');
const topicRouter = require('./routes/topicRoutes');
const subtopicRouter = require('./routes/subtopicRoutes');
const qtypeRouter = require('./routes/qtypeRoutes');
const qskillRouter = require('./routes/qskillRoutes');
const questionRouter = require('./routes/questionRoutes');
const exerciseRouter = require('./routes/exerciseRoutes');


// Start express app
const app = express();

//HTTPS Rerouting
app.enable('trust proxy');
app.use((req, res, next) => {
    if (process.env.NODE_ENV != 'development' && !req.secure) {
        return res.redirect("https://" + req.headers.host + req.url);
    }
    next();
})

//Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Define environment
let url = null;
if (process.env.NODE_ENV === 'production') {
    url = "https://www.themathx.com";
} else {
    url = "http://localhost:3000";
}

//CORS Policy
app.use(cors({
    origin: url,
    credentials: true
}));
app.options('*', cors());

//Apply middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Apply Cookies
app.use(
    session({
        secret: "mathxsecret",
        resave: true,
        saveUninitialized: true
    })
);
app.use(cookieParser("mathxsecret"));

//Apply Passport
app.use(passport.initialize());
app.use(passport.session());
require('./configs/passport')(passport);

// 3) ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/topic', topicRouter);
app.use('/api/v1/subtopic', subtopicRouter);
app.use('/api/v1/qtype', qtypeRouter);
app.use('/api/v1/qskill', qskillRouter);
app.use('/api/v1/question', questionRouter);
app.use('/api/v1/exercise', exerciseRouter);

module.exports = app;