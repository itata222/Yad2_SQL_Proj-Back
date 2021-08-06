const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const {sql} = require("../db/db");

const auth = async (req, res, next) => {
    let user;
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const data = jwt.verify(token, process.env.TOKEN_SECRET);
        const query=`SELECT tblUsers.userID,tblUsers.email, tblTokens.token
                 FROM tblUsers
                 JOIN tblTokens ON tblUsers.userID=tblTokens.userID
                 WHERE tblUsers.userID=${data._id} AND
                 tblTokens.token='${token}'`
        const reqSql= new sql.Request();
        reqSql.query(query,(err,recordset)=>{
            if(err){
                console.log('err1',err.originalError.message)
                return;
            }
            user=recordset.recordset[0];
            req.user = user;
            req.token = token;
            next();
        })
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: 'lack of authentication'
        })
    }
}

module.exports = auth