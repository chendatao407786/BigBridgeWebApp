let fitbitReqUrl='https://192.168.0.10:52423';
let connectionPool = {
    user: "c##bigbridge",
    password: "mbds",
    connectString: "localhost:1521/ORCLCDB.localdomain"
}
function executionSqlQuery(err, connection, query, parametres, res, format) {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log("connected");
    connection.execute(
        query,
        parametres,
        {
            outFormat: format,
            maxRows: 10,
            autoCommit: true
        },
        function (err, result) {
            if (err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            res.json(result.rows);
            doRelease(connection);
        })
}
function doRelease(connection) {
    connection.close(
        function (err) {
            if (err)
                console.error(err.message);
        });
}
module.exports = {
    fitbitReqUrl:fitbitReqUrl,
    connectionPool: connectionPool,
    doRelease: doRelease,
    executionSqlQuery: executionSqlQuery
}

