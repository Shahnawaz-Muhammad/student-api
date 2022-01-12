const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Import Routes
const ClassRoute = require('./routes/class');
const StudentRoute = require('./routes/student');
// const profile = require('./routes/api/profile');

const app = express();

// Body Parser MiddleWare
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Config
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err)),
  { useNewUrlParser: true };

const port = process.env.PORT || 5000;

//Routes
app.use('/class', ClassRoute);
app.use('/student', StudentRoute);

// app.use('/api/profile', profile);

app.listen(port, () => console.log(`Server running on port ${port}`));
