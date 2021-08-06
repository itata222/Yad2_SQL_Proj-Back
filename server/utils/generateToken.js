const jwt = require("jsonwebtoken");
const {sql} = require("../db/db");

const generateToken=async function (userID) {
    const token = jwt.sign(
        {
            _id: userID,
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: "6h"
        }
    );
    const reqSql= new sql.Request();
    reqSql.query(`insert into tblTokens (userID,token) values('${userID}','${token}')`,(err,recordset)=>{
        if(err){
            console.log('errr',err.originalError.message)
            return;
        }
    })
    return token;
};

module.exports=generateToken;