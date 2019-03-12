const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const apphttps = express();
const user = require('./routers/api/user');
const auth = require('./routers/api/auth');
const functions = require('./functions');



apphttps.set('view engine','ejs');
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
// apphttps.use('/api/fitbit/auth',fitbit);

const httpsPort = process.env.PORT || 52423;
const httpPort = process.env.PORT || 8080;

// const httpsOptions = {
//     key: fs.readFileSync(path.join(__dirname,'ssl','key.pem')),
//     cert:fs.readFileSync(path.join(__dirname,'ssl','cert.pem')),
//     passphrase:'bigbridge'
// }
// http.createServer(app).listen(httpPort,() => console.log('http server started at ' + httpPort))
// https.createServer(httpsOptions,apphttps).listen(httpsPort,() => console.log('https server started at ' + httpsPort));
// app.listen(httpPort, () => console.log('server started at ' + httpPort));
cron.schedule("0 15 * * *", function () {
    functions.generateCSV();
    functions.generateGeoJSON();
    functions.generateNewAPICSV();
});

const port = process.env.PORT || 52423;
app.listen(port, () => console.log('server started at ' + port));

