
const Connection = require('tedious').Connection;  
const config = {  
    server: 'DESKTOP-UDESKUO',  
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USER, 
            password: process.env.DB_PWD  
        }
    },
    options: {
        database: process.env.DB_NAME  
    }
};  
const connection = new Connection(config);  
connection.on('connect', function(err) {  
    console.log("Connected");  
    // executeStatement();
});

connection.connect();

module.exports=connection;
