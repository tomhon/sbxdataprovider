var config = require("./config");


var Connection = require('tedious').Connection; 
var Request = require('tedious').Request  
var TYPES = require('tedious').TYPES;  


module.exports = function sqlRequest (res) {
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


function createSQLRequest(userData) {
    var date = new Date();
    sqlRequestString = "Select ";
    sqlRequestString += "SUM(dataproviderTest.Lane1FirstAtHole), SUM(dataproviderTest.Lane2FirstAtHole), SUM(dataproviderTest.Lane3FirstAtHole), SUM(dataproviderTest.Lane4FirstAtHole), SUM(dataproviderTest.Lane5FirstAtHole), SUM(dataproviderTest.Lane6FirstAtHole),";
    sqlRequestString += "SUM(dataproviderTest.Lane1FirstAtSplit), SUM(dataproviderTest.Lane2FirstAtSplit), SUM(dataproviderTest.Lane3FirstAtSplit), SUM(dataproviderTest.Lane4FirstAtSplit), SUM(dataproviderTest.Lane5FirstAtSplit), SUM(dataproviderTest.Lane6FirstAtSplit),";
    sqlRequestString += "SUM(dataproviderTest.Lane1FirstAtFinish), SUM(dataproviderTest.Lane2FirstAtFinish), SUM(dataproviderTest.Lane3FirstAtFinish), SUM(dataproviderTest.Lane4FirstAtFinish), SUM(dataproviderTest.Lane5FirstAtFinish), SUM(dataproviderTest.Lane6FirstAtFinish)";
    
    sqlRequestString += "From dataproviderTest";
    return sqlRequestString;
}