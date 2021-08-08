const express = require('express')
const cors = require('cors')

const app = express();
const port = process.env.PORT
const userRouter = require('./routers/userRouter');
const {sql, sqlConfig}=require('./db/db');
const { checkIfUsersTableExistAndCreateIt, checkIfTokensTableExistAndCreateIt, checkIfPostsTableExistAndCreateIt, checkIfPhotosTableExistAndCreateIt } = require('./setupDB/createTables');
const { createUserProcedure, logoutProcedure, getUserByIDProcedure, updateUserProcedure, addPostProcedure } = require('./storedProcedures/inSiteProcedures');
sql.connect(sqlConfig, function(err) {
    checkIfUsersTableExistAndCreateIt();
    checkIfTokensTableExistAndCreateIt();
    checkIfPostsTableExistAndCreateIt();
    checkIfPhotosTableExistAndCreateIt();
});
app.use(cors());
app.use(express.json())
app.use(userRouter)
app.listen(port, () => {
    console.log('server runs, port:', port);
})

