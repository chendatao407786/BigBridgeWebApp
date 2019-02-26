const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const user = require('./routers/api/user');
const auth = require('./routers/api/auth');
const functions = require('./functions');

app.use(bodyParser.json());
app.use(methodOverride('_method'))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});

app.use('/api/user',user);
app.use('/api/auth',auth);

cron.schedule("0 15 * * *", function () {
    functions.generateCSV();
    functions.generateGeoJSON();
    functions.generateNewAPICSV();
});

const port = process.env.PORT || 52423;
app.listen(port, () => console.log('server started at ' + port));

