const dbf = require('dbf-reader');
const fs = require('fs');


class LinesController {

    lines = []

    getLines() {
        return this.lines
    }

    constructor() {
        if (LinesController._instance) {
            return LinesController._instance
        }
        LinesController._instance = this;

        // Init
        var buffer = fs.readFileSync('static/v_uptu_lsv_destinos.dbf')
        var datatable = dbf.Dbf.read(buffer);
        if (datatable) {
            this.lines = [... new Set(datatable.rows.map(row => row['DESC_LINEA']))]
        }

    }
}

module.exports = {LinesController};
