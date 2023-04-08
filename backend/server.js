const dotenv = require('dotenv').config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV, SHOULD BE AT TOP
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const errorHandler = require('./middleWare/errorMiddleware');
const customerRoute = require('./routes/customerRoute');
const employeeRoute = require('./routes/employeeRoute');
const toolRoute = require('./routes/toolRoute');
const purchaseRoute = require('./routes/purchaseRoute');
const salesRoute = require('./routes/salesRoute');

// instanciate express app
const app = express();

// Middlewares
app.use(express.json()); // lets us parse json bodies in the request object
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ['http://localhost:3000'], // frontend url
    credentials: true, // this lets us exchange credentials between the backend to the frontend when making requests
  })
); // helps to resolve conflict when making requests from backend to frontend

// Routes
app.get('/', (req, res) => {
  res.send('Home Page');
});

// Routes Middleware
app.use('/api/customers', customerRoute);
app.use('/api/employees', employeeRoute);
app.use('/api/tools', toolRoute);
app.use('/api/purchases', purchaseRoute);
app.use('/api/sales', salesRoute);

// Error Middleware
app.use(errorHandler);

// Connect to DB and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
