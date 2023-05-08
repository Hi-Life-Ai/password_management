const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/connection');
const userRoute = require('./route/user');
const folderRoute = require('./route/folder');
const passwordRoute = require('./route/password');
const assignedRoute = require('./route/userassignment');
const designationRoute = require('./route/designation');
const errorMiddleware = require('./middleware/errorHandle');
const Cors = require('cors');
// Setting up config file
dotenv.config();

// Handle uncaught exceptions => hqandling undefined variables ..

    process.on('uncaughtException', err => {
      console.log(`ERROR: ${err.message}`);
      console.log('Shutting down due to uncaught exception')
      server.close(() => {
        process.exit(1);
      })
    })

// Connection to database mongodb
connectDb();

const app = express();

app.use(Cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api', userRoute, passwordRoute, folderRoute, designationRoute,assignedRoute);

// Handling middleware error
app.use(errorMiddleware);
const port = process.env.PORT || 8002
const env  = process.env.NODE_ENV;
const server = app.listen(port, ()=> console.log(`Server started at ${env} mode port ${port}`));
