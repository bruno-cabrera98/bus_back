const express = require('express');
const router = express.Router();

router.get('/list', async function(req, res, next) {
    res.json(global.bus_data)
})

module.exports = router