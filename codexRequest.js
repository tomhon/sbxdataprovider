var config = require("./config");


var Connection = require('tedious').Connection; 
var Request = require('tedious').Request  
var TYPES = require('tedious').TYPES;  


module.exports = function codexRequest (res) {
    console.log('Connecting to SQL');

    //initialize SQL connection
    
    var connection = new Connection(config);  

    //when connection comes up 
    connection.on('connect', function(err) {  
        if (err) {
            console.log(err); 

        } else {
            //if successful execute insert
            console.log("Connected to SQL"); 
            sqlRequestString = createSQLRequest();
            console.log(sqlRequestString);

            executeSQLRequest(sqlRequestString);
        }
    }); 

    function executeSQLRequest(sqlString) {
        console.log('Executing SQL Request');
        var retrievedData = [];

        request = new Request(sqlString, function(err) {  
                if (err) {  
                console.log(err);
                console.log(sqlString);
                res.send('SQL request error' + err);
                }  
            }); 

        request.on('row', function(columns) {
            responseRow = {
                "raceCodex": columns[0].value,
                "gender": columns[1].value,
                "event": columns[2].value
            }  
            retrievedData.push(responseRow);
        });  

        request.on('requestCompleted', function () { 
            console.log('request Completed');
            res.header('Access-Control-Allow-Origin', "*");
            res.send(retrievedData);
        });

        connection.execSql(request);  
    }

 
};  


function createSQLRequest() {
    sqlRequestString = "SELECT DISTINCT raceCodex, gender, event from dbo.TestTable";
    return sqlRequestString;
}