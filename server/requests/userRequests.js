const connection=require('../db/db');
const sql=require('mssql');


const req=new sql.Request(connection);

req.query("select * from tblUsers",(err,records)=>{
    if(err)
        console.log(err)
    else
        console.log(records)
    
})

//https://www.youtube.com/watch?v=MLcXfRH1YzE