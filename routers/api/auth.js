const express = require('express');
const router = express.Router();
const config = require('../../config');
const oracledb = require('oracledb');

router.post('/', (req, res) => {
    let query = "INSERT into AUTH (username,email,password) VALUES (:username,:email,:password)";
    let parametres = {
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    }
    oracledb.getConnection(
        config.connectionPool,
        function(err,connection){
            config.executionSqlQuery(err,connection,query,parametres,res,oracledb.OBJECT)
        }
    )
})
module.exports = router;