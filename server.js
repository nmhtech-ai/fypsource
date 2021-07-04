const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');


//Link with Database
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log("\x1b[36m%s\x1b[0m", "[SUCCESS] MongoDB(MathX) is connected..."));


//Heroku build
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

// Set port, Listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("\x1b[36m%s\x1b[0m", `[SUCCESS] Server is running on port ${PORT}...`);
});