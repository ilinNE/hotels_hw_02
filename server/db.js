const settings = require('./settings');

const pgp = require('pg-promise')({})
const cn = (
    `postgres://${settings.DB_USER}` 
    + `:${settings.DB_PASSWORD}`
    + `@${settings.DB_HOST}`
    + `:${settings.DB_PORT}`
    + `/${settings.DB_NAME}`
    )

const db = pgp(cn);

module.exports = [db, pgp];

