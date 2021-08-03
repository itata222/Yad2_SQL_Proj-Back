
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


// const Request = require('tedious').Request;  
// const TYPES = require('tedious').TYPES;  

// function executeStatement() {  
//     request = new Request("SELECT * from tblUsers", function(err) {  
//     if (err) {  
//         console.log(err);}  
//     });  
//     const result = "";  
//     request.on('row', function(columns) {  
//         columns.forEach(function(column) {  
//           if (column.value === null) {  
//             console.log('NULL');  
//           } else {  
//             result+= column.value + " ";  
//           }  
//         });  
//         console.log(result);  
//         result ="";  
//     });  

//     request.on('done', function(rowCount, more) {  
//     console.log(rowCount + ' rows returned');  
//     });  
    
//     // Close the connection after the final event emitted by the request, after the callback passes
//     request.on("requestCompleted", function (rowCount, more) {
//         connection.close();
//     });
//     connection.execSql(request);  
// }  