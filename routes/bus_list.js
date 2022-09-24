const express = require('express');
const {LinesController} = require("../linesController");
const router = express.Router();

router.get('/list', async function(req, res, next) {
    const bus_list = req.query.busList
    if (bus_list)
    {
        const parsed_bus_list = bus_list.split(',')
        const lines = global.bus_data.filter(bus => parsed_bus_list.includes(bus.line))
        res.json(lines)
    }
    else
    {
        res.json(global.bus_data)
    }
})

router.get('/lines', async function(req, res, next) {
    const linesController = new LinesController()
    res.json(linesController.getLines())
})

module.exports = router