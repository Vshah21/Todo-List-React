const Pool = require("pg").Pool;
const config = require('./config');

const pool = new Pool({
    user: config.config.user,
    host: config.config.host,
    database: config.config.database,
    password: config.config.password,
    port:5432,

})

module.exports = pool