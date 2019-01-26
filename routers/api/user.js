const express = require('express');
const router = express.Router();
const config = require('../../config');
const oracledb = require('oracledb');
router.get('/', (req, res) => {
    let query = 'SELECT u.id,u.name,u.DATE_NAISSANCE as BIRTHDAY, u.WEIGHT,u.SMOKING,u.SPORT,u.HEART_DISEASE as "HEART DISEASE",u.ASTHMA FROM USER_INFO u';
    let parametres = {};
    oracledb.getConnection(
        config.connectionPool,
        function (err, connection) {
            config.executionSqlQuery(err, connection, query, parametres, res, oracledb.OBJECT)
        }
    )
})
router.get('/:id', (req, res) => {
    let query = "SELECT u.id,u.name,TO_CHAR(u.DATE_NAISSANCE,'dd/mm/yyyy') as BIRTHDAY, u.WEIGHT,u.SMOKING,u.SPORT,u.HEART_DISEASE as \"HEART DISEASE\",u.ASTHMA FROM USER_INFO u WHERE u.id = :id";
    let parametres = { id: req.params.id };
    oracledb.getConnection(
        config.connectionPool,
        function (err, connection) {
            config.executionSqlQuery(err, connection, query, parametres, res, oracledb.OBJECT)
        }
    )
})
router.post('/', (req, res) => {
    let query = "INSERT into USER_INFO (id,name,date_naissance,weight,smoking,sport,heart_disease,asthma) VALUES (13121235,:name,TO_DATE( :birthday, 'DD-MM-YYYY' ),:weight,:smoking,:sport,:heart_disease,:asthma)";
    let parametres = {
        name:req.body.name,
        birthday:req.body.birthday,
        weight:parseInt(req.body.weight),
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