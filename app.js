const cors = require('cors');
const express = require('express');
const morgan = require('morgan');


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

// 3) ROUTES
// app.use('/', viewRouter);
// app.use('/api/v1/tours', tourRouter);
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/reviews', reviewRouter);
// app.use('/api/v1/bookings', bookingRouter);

module.exports = app;