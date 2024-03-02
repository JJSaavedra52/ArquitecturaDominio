const db = require('mongoose');
require('dotenv').config();
// db.Promise = global.Promise;
const url_db = process.env.DB_HOST;


const connect = async() => {
    await db.connect(url_db);
    console.log('[db] Conectada con éxito');
}

module.exports = connect