const express = require('express');
const router = express.Router();
const config = require('../../config');
const oracledb = require('oracledb');
router.get('/', (req, res) => {
    let query = 'SELECT u.name,u.DATE_NAISSANCE as BIRTHDAY,u.sex, u.WEIGHT,u.SMOKING,u.SPORT,u.HEART_DISEASE as "HEART DISEASE",u.ASTHMA FROM USER_INFO u';
    let parametres = {};
    oracledb.getConnection(
        config.connectionPool,
        function (err, connection) {
            config.executionSqlQuery(err, connection, query, parametres, res, oracledb.OBJECT)
        }
    )
})
router.get('/:username', (req, res) => {
    let query = "SELECT u.name,u.sex,TO_CHAR(u.DATE_NAISSANCE,'dd/mm/yyyy') as BIRTHDAY, u.WEIGHT,u.SMOKING,u.SPORT,u.HEART_DISEASE as \"HEART DISEASE\",u.ASTHMA FROM USER_INFO u WHERE u.username = :username";
    let parametres = { username: req.params.username};
    oracledb.getConnection(
        config.connectionPool,
        function (err, connection) {
            config.executionSqlQuery(err, connection, query, parametres, res, oracledb.OBJECT)
        }
    )
})
router.post('/', (req, res) => {
    console.log(req.body);
    let query = "INSERT into USER_INFO (username,name,date_naissance,sex,weight,smoking,sport,heart_disease,asthma) VALUES (:username,:name,TO_DATE( :birthday, 'DD-MM-YYYY' ),:sex,:weight,:smoking,:sport,:heart_disease,:asthma)";
    let parametres = {
        username:req.body.username,
        name:req.body.name,
        birthday:req.body.birthday,
        sex:req.body.sex,
        weight:req.body.weight,
        smoking:req.body.smoking,
        sport:req.body.sport,
        heart_disease:req.body.heart_disease,
        asthma:req.body.asthma
    }
    oracledb.getConnection(
        config.connectionPool,
        function(err,connection){
            config.executionSqlQuery(err,connection,query,parametres,res,oracledb.OBJECT)
        }
    )
})

router.put('/:username',(req,res)=>{
    console.log(req.body);
    console.log(req.params.username);
    
    let query = "UPDATE USER_INFO "+ 
                "SET " + 
                "name=:name,"+
                "sex=:sex,"+
                "date_naissance=TO_DATE(:birthday,'DD-MM-YYYY'),"+
                "weight=:weight,"+
                "smoking=:smoking,"+
                "sport=:sport,"+
                "heart_disease=:heart_disease,"+
                "asthma=:asthma "+
                "where username=:username";
                
    let parametres={
        username:req.body.username,
        name:req.body.name,
        birthday:req.body.birthday,
        sex:req.body.sex,
        weight:req.body.weight,
        smoking:req.body.smoking,
        sport:req.body.sport,
        heart_disease:req.body.heart_disease,
        asthma:req.body.asthma 
    }
    oracledb.getConnection(
        config.connectionPool,
        function(err,connection){
            config.executionSqlQuery(err,connection,query,parametres,res,oracledb.OBJECT)
        }
    )
})
module.exports = router;