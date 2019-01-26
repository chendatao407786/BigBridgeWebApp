let connectionPool = {
    user: "c##big_bridge",
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
    connectionPool: connectionPool,
    doRelease: doRelease,
    executionSqlQuery: executionSqlQuery
}

