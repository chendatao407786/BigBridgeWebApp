const spawn = require('child_process').spawn
const request = require('request');
const express = require('express');
const path = require("path");

const router = express.Router();

router.get('/', (req, res, next) => {
    let data = req.query
    console.log(req.query);
    
    var url = "http://127.0.0.1:8528/has-risk?bmi=" + data.bmi 
            + "&station=" + data.station 
            + "&postalcode=" + data.postalcode 
            + "&drinking=" + data.drinking 
            + "&smoking=" + data.smoking 
            + "&gender=" + data.gender 
            + "&height=" + data.height
            + "&weight=" + data.weight 
            + "&age=" + data.age;
    request(url, (error, response, body) => {
        if (error) {
            console.log(error);
            res.status(500);
        } else {
            let json = JSON.parse(response.body);
            let oui = json.person[0].POui;
            let non = json.person[0].PNon;
            if (oui > non) {
                res.send(true);
            } else {
                res.send(false);
            }
        }
    });
});

module.exports = router;