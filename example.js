 // oracledb.getConnection(
    //     config.connectionPool,
    //     function(err, connection){
    //         if (err) {
    //             console.error(err.message);
    //             return;
    //         }
    //         console.log("connected");
    //         connection.execute(
    //             'SELECT u.PERSONNAL_INFORMATION FROM USER_INFORMATION u WHERE u.PERSONNAL_INFORMATION.name = :name',
    //             { name: req.params.name },
    //             function (err, result) {
    //                 if (err) {
    //                     console.error(err.message);
    //                     doRelease(connection);
    //                     return;
    //                 }
    //                 res.send(JSON.stringify(result));
    //                 config.doRelease(connection);
    //             })

    //     }
    // )