const url = 'https://trouver.datasud.fr/api/3/action/package_show?id=concentrations-horaires-de-polluants-dans-lair-ambiant-issues-du-reseau-permanent-de-mesures-automa';

const CSVLinks = [
    // Nice Arson
    { name: "Arson", link: "https://www.atmosud.org/aasqa_air_station/download-data/24036/periodicity/2" },
    // Nice Aéroport
    { name: "Aeroport", link: "https://www.atmosud.org/aasqa_air_station/download-data/24030/periodicity/2" },
    // Nice Botanique
    { name: "Botanique", link: "https://www.atmosud.org/aasqa_air_station/download-data/24011/periodicity/2" },
    // Nice Promenade
    { name: "Promenade", link: "https://www.atmosud.org/aasqa_air_station/download-data/24035/periodicity/2" },
    // Peillon
    { name: "Peillon", link: "https://www.atmosud.org/aasqa_air_station/download-data/24021/periodicity/2" },
    // Contes
    { name: "Contes", link: "https://www.atmosud.org/aasqa_air_station/download-data/24023/periodicity/2" }
];

const CSVFiles = [
    "CSV/Mesures horaires d'oxydes d'azote (NOx).csv",
    "CSV/Mesures horaires d'ozone (O3).csv",
    "CSV/Mesures horaires de benzène (C6H6).csv",
    "CSV/Mesures horaires de dioxyde d'azote (NO2).csv",
    "CSV/Mesures horaires de dioxyde de soufre (SO2).csv",
    "CSV/Mesures horaires de monoxyde de carbone (CO).csv",
    "CSV/Mesures horaires de particules PM2.5.csv",
    "CSV/Mesures horaires de particules PM10.csv"
];

const GeoJSONFiles = [
    "GeoJSON/Mesures horaires d'oxydes d'azote (NOx).geojson",
    "GeoJSON/Mesures horaires d'ozone (O3).geojson",
    "GeoJSON/Mesures horaires de benzène (C6H6).geojson",
    "GeoJSON/Mesures horaires de dioxyde d'azote (NO2).geojson",
    "GeoJSON/Mesures horaires de dioxyde de soufre (SO2).geojson",
    "GeoJSON/Mesures horaires de monoxyde de carbone (CO).geojson",
    "GeoJSON/Mesures horaires de particules PM2.5.geojson",
    "GeoJSON/Mesures horaires de particules PM10.geojson"
];

module.exports = {
    generateNewAPICSV: function () {
        console.log('------------------------------');
        console.log('Starting to generate CSV from new api...');
        if (!fs.existsSync("CSV")) {
            fs.mkdirSync("CSV");
        }
        CSVLinks.forEach((link) => {
            request(link.link, function (error, response, body) {
                if (error != null) {
                    console.log('error:', error);
                    console.log(link.name + '.csv failed!');
                    console.log('------------------------------');
                    return { "error": error, "file": 'none' };
                }
                if (response.statusCode == 200) {
                    let writeStream = fs.createWriteStream("CSV/" + link.name + ".csv");

                    response.pipe(writeStream);
                    response.on('end', function () {
                        console.log(link.name + '.csv completed!');
                        console.log('------------------------------');
                    });
                    writeStream.on('error', function (err) {
                        console.log(link.name + '.csv failed!');
                        console.log('------------------------------');
                    });
                }
            });
        });
    },

    generateCSV: function () {
        console.log('------------------------------');
        console.log('Starting to generate CSV from api...');
        request(url, function (error, response, body) {
            if (error != null) {
                console.log('error:', error);
                return { "error": error, "file": 'none' };
            }
            if (response.statusCode == 200) {

                if (!fs.existsSync("CSV")) {
                    fs.mkdirSync("CSV");
                }

                var json = JSON.parse(body);
                for (resource in json.result.resources) {

                    if (json.result.resources[resource].format === 'CSV') {

                        let rsc = json.result.resources[resource].name;
                        var request = https.get(json.result.resources[resource].url, function (response) {
                            let writeStream = fs.createWriteStream("CSV/" + rsc + ".csv");

                            response.pipe(writeStream);
                            response.on('end', function () {
                                console.log(rsc + '.csv completed!');
                            });
                            writeStream.on('error', function (err) {
                                console.log(rsc + '.csv failed!');
                            });
                        });
                    }
                }
            }
        });
    },

    generateGeoJSON: function () {
        console.log('------------------------------');
        console.log('Starting to generate GeoJSON from api...');
        request(url, function (error, response, body) {
            if (error != null) {
                console.log('error:', error);
                return { "error": error, "file": 'none' };
            }
            if (response.statusCode == 200) {

                if (!fs.existsSync("../public/geojsons")) {
                    fs.mkdirSync("../public/geojsons");
                }

                var json = JSON.parse(body);
                for (resource in json.result.resources) {

                    if (json.result.resources[resource].format === 'geojsons') {

                        let rsc = json.result.resources[resource].name;
                        var request = http.get(json.result.resources[resource].url, function (response) {
                            let writeStream = fs.createWriteStream("../public/geojsons/" + rsc + ".geojson");

                            response.pipe(writeStream);
                            response.on('end', function () {
                                console.log(rsc + '.geojson completed!');
                            });
                            writeStream.on('error', function (err) {
                                console.log(rsc + '.geojson failed!');
                            });
                        });
                    }
                }
            }
        });
    }
}