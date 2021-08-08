const {sql} = require("../db/db");


function checkIfUsersTableExistAndCreateIt(){
    const reqSql= new sql.Request();
    const query=`IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = N'tblUsers')
                BEGIN
                EXEC create_users_table
                END`;
    reqSql.query(query,async(err,recordset)=>{
        if(err){
            console.log('err',err.originalError.message)
            return;
        }
    })
}
function checkIfTokensTableExistAndCreateIt(){
    const reqSql= new sql.Request();
    const query=`IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = N'tblTokens')
                BEGIN
                EXEC create_tokens_table
                END`;
    reqSql.query(query,async(err,recordset)=>{
        if(err){
            console.log('err',err.originalError.message)
            return;
        }
    })
}
function checkIfPostsTableExistAndCreateIt(){
    const reqSql= new sql.Request();
    const query=`IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = N'tblPosts')
                BEGIN
                EXEC create_posts_table
                END`;
    reqSql.query(query,async(err,recordset)=>{
        if(err){
            console.log('err',err.originalError.message)
            return;
        }
    })
}
function checkIfPhotosTableExistAndCreateIt(){
    const reqSql= new sql.Request();
    const query=`IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = N'tblPhotos')
                BEGIN
                EXEC create_photos_table
                END`;
    reqSql.query(query,async(err,recordset)=>{
        if(err){
            console.log('err',err.originalError.message)
            return;
        }
    })
}

module.exports={
    checkIfUsersTableExistAndCreateIt,
    checkIfTokensTableExistAndCreateIt,
    checkIfPostsTableExistAndCreateIt,
    checkIfPhotosTableExistAndCreateIt
}