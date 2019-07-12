const express = require('express');
const connectDB = require('./config/db')

const app = express();

//connect Database
connectDB();

//Init Middlewear This will allow us to get the data in (req.body) users.js
app.use(express.json({ extended: false}));

//This'll take a get request to / put in the call back with request and response
//Send the data to the brauser
app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
 
//We gonna use "process.env.PORT" when we deply with Heroku this gonna get port number.
//For now,as a default we gonna use 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));