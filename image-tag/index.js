// required libs
const express = require('express');

// initialize app
const app = express();

// initialize ports
const port = process.env.PORT || '8000';

// initialize routes
const routes = require('./src/routes');

// set routes and base path
app.use('/', routes);

// set path to make images available
app.use(express.static('/media/image-tag/images'));

// set routes
app.listen(port, () => console.log(`listening on port ${port}`));
