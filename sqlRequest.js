var config = require("./config");


var Connection = require('tedious').Connection; 
var Request = require('tedious').Request  
var TYPES = require('tedious').TYPES;  


module.exports = function sqlRequest (req, res) {
    console.log('Connecting to SQL');
    res.send('Test Response from sqlRequest');

    //initialize SQL connection
    
    var connection = new Connection(config);  

    //when connection comes up 
    connection.on('connect', function(err) {  
        if (err) {
            console.log(err); 

        } else {
            //if successful execute insert
            console.log("Connected to SQL"); 
            sqlRequestString = createSQLRequest(req.query.raceCodex, req.query.phaseID);
            console.log(sqlRequestString);
            // executeSQLRequest(sqlRequestString);
        }
    }); 

    function executeSQLRequest(sqlString) {
        console.log('Executing SQL Request');
        request = new Request(sqlString, function(err) {  
                if (err) {  
                console.log(err);
                console.log(sqlString);


                }  
            });  
        request.on('row', function(columns) {  
            var retrievedData = [];
            columns.forEach(function(column) {  
                if (column.value === null) {  
                console.log('NULL');  
                } else {  
                retrievedData.push(column.value);
                console.log("value of retrieved item is " + column.value);  
                } 
            
            }); 
            console.log(retrievedData);

            var responseData = {
                "Lane1FirstAtHole": retrievedData[0],
                "Lane2FirstAtHole": retrievedData[1],
                "Lane3FirstAtHole": retrievedData[2],
                "Lane4FirstAtHole": retrievedData[3],
                "Lane5FirstAtHole": retrievedData[4],
                "Lane6FirstAtHole": retrievedData[5],
                "Lane1FirstAtSplit": retrievedData[6],
                "Lane2FirstAtSplit": retrievedData[7],
                "Lane3FirstAtSplit": retrievedData[8],
                "Lane4FirstAtSplit": retrievedData[9],
                "Lane5FirstAtSplit": retrievedData[10],
                "Lane6FirstAtSplit": retrievedData[11],
                "Lane1FirstAtFinish": retrievedData[12],
                "Lane2FirstAtFinish": retrievedData[13],
                "Lane3FirstAtFinish": retrievedData[14],
                "Lane4FirstAtFinish": retrievedData[15],
                "Lane5FirstAtFinish": retrievedData[16],
                "Lane6FirstAtFinish": retrievedData[17]
            };
            res.header('Access-Control-Allow-Origin', "*");
            res.send(responseData);
        });       
        connection.execSql(request);  
    }

 
};  


function createSQLRequest(raceCodex, phaseID) {
    var date = new Date();
    sqlRequestString = "Select ";
    sqlRequestString += "COUNT(TestTable.Lane1FirstAtHole), COUNT(TestTable.Lane2FirstAtHole), COUNT(TestTable.Lane3FirstAtHole), COUNT(TestTable.Lane4FirstAtHole), COUNT(TestTable.Lane5FirstAtHole), COUNT(TestTable.Lane6FirstAtHole),";
    sqlRequestString += "COUNT(TestTable.Lane1FirstAtSplit), COUNT(TestTable.Lane2FirstAtSplit), COUNT(TestTable.Lane3FirstAtSplit), COUNT(TestTable.Lane4FirstAtSplit), COUNT(TestTable.Lane5FirstAtSplit), COUNT(TestTable.Lane6FirstAtSplit),";
    sqlRequestString += "COUNT(TestTable.Lane1FirstAtFinish), COUNT(TestTable.Lane2FirstAtFinish), COUNT(TestTable.Lane3FirstAtFinish), COUNT(TestTable.Lane4FirstAtFinish), COUNT(TestTable.Lane5FirstAtFinish), COUNT(TestTable.Lane6FirstAtFinish)";
    
    sqlRequestString += " From TestTable";
    if (raceCodex) {
            if (phaseID) {
                sqlRequestString += " Where raceCodex = '" + raceCodex + "' AND phaseID = '" + phaseID + "'";
                } else {
                sqlRequestString += " Where raceCodex = '" + raceCodex + "'";
                } 
        } else {
            if (phaseID) {
                sqlRequestString += " Where phaseID = '" + phaseID + "'";
        } 
    }

    return sqlRequestString;
}