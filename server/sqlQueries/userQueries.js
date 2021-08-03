const Request = require('tedious').Request;  
const TYPES = require('tedious').TYPES;  

const executeStatement=()=> {  
    request = new Request("SELECT * from tblUsers", function(err) {  
    if (err) {  
        console.log(err);}  
    });  
    const result = "";  
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {  
            console.log('NULL');  
          } else {  
            result+= column.value + " ";  
          }  
        });  
        console.log(result);  
        result ="";  
    });  

    request.on('done', function(rowCount, more) {  
    console.log(rowCount + ' rows returned');  
    });  
    
    request.on("requestCompleted", function (rowCount, more) {
        console.log('request completed' )
        // connection.close();
    });
    // connection.execSql(request);  
} 

module.exports=executeStatement;