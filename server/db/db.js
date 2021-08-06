const sql = require('mssql');

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: 'DESKTOP-UDESKUO',
  options: {
    trustedConnection:true ,
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}
module.exports={
    sql,
    sqlConfig
}
// connectionFunc().then(res=>console.log(res))