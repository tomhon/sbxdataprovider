var config = require("./config");


var Connection = require('tedious').Connection; 
var Request = require('tedious').Request  
var TYPES = require('tedious').TYPES;  


module.exports = function sqlRequest (logEntry) {
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
            sqlRequestString = createSQLRequest(logEntry);
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