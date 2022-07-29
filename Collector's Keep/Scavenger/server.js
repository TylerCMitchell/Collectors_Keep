/** @format */

const express = require('express');
const cors = require('cors');
const port = 8000;
const app = express();

require('dotenv').config();
const cookieParser = require('cookie-parser');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('images'));
require('./server/config/mongoose.config');
require('./server/routes/item.routes')(app);

app.listen(port, () => console.log(`You are now listening to port: ${port}`));
