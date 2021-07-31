const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan")
const colors = require("colors")
const connectDB = require("./config/db");
const blog = require("./routes/blog")
const comment = require("./routes/comment")



dotenv.config({ path: './config/config.env'});

connectDB();

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/api/blog', blog);
app.use('/api/comment', comment);

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold))