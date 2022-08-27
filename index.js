const express = require('express');
const path = require('path');
const logger = require('morgan');

const cors = require('cors')

const busListRouter = require('./routes/bus_list')
const bus_data = require("./bus_data");

const app = express();

app.use(express.static('build'))
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/buses', busListRouter);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

bus_data.init_bus_scheduler()

module.exports = app;