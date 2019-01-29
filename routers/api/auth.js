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

router.post('/login',(req,res)=>{
    let query = "select * from auth where username = :username and password = :password";
    let parametres = {
        username:req.body.username,
        password:req.body.password
    }

    oracledb.getConnection(
        config.connectionPool,
        function(err,connection){
            if(err){
                console.error(err.message);
                return;
            }
            connection.execute(
                query,
                parametres,
                {
                    outFormat: oracledb.OBJECT,
                    maxRows: 10,
                    autoCommit: true
                },
                function(err,result){
                    if(err){
                        console.error(err.message);
                        config.doRelease(connection);
                        return;
                    }else{
                        if(result.rows.length>0){
                            res.json(result.rows);
                        }else{
                            res.status(401).send("username or password incorrect");
                        }
                        config.doRelease(connection);
                    }
                }
            )
        }

    )
    // oracledb.getConnection(
    //     config.connectionPool,
    //     function(err,connection){
    //         config.executionSqlQuery(err,connection,query,parametres,res,oracledb.OBJECT)
    //     }
    // )
})
module.exports = router;