const initOptions = {}
const pgp = require('pg-promise')(initOptions)
const cn = 'postgres://node_user:Mellon5851@127.0.0.1:5432/node_db'
const db = pgp(cn);

module.exports = db;

