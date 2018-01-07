var restify = require('restify');
var sqlRequest = require("./sqlRequest");

var server = restify.createServer();
server.use(restify.plugins.queryParser());

server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// function dashboardDataStructure() {

//     this.raceCodex = 'TEST', //unique identifier for this race
//     this.phaseID = 'Final', //heat1, heat2, heat3, heat3, heat5, heat6, quarter1, quarter2, quarter3, quarter4, semi1, semi2, final
//     this.Lane1FirstAtHole= Math.floor(Math.random() * 100);
//     this.Lane2FirstAtHole= Math.floor(Math.random() * 100);
//     this.Lane3FirstAtHole= Math.floor(Math.random() * 100);
//     this.Lane4FirstAtHole= Math.floor(Math.random() * 100);
//     this.Lane5FirstAtHole= Math.floor(Math.random() * 100);
//     this.Lane6FirstAtHole= Math.floor(Math.random() * 100);
//     this.Lane1FirstAtSplit=Math.floor(Math.random() * 100);
//     this.Lane2FirstAtSplit=Math.floor(Math.random() * 100);
//     this.Lane3FirstAtSplit=Math.floor(Math.random() * 100);
//     this.Lane4FirstAtSplit=Math.floor(Math.random() * 100);
//     this.Lane5FirstAtSplit=Math.floor(Math.random() * 100);
//     this.Lane6FirstAtSplit=Math.floor(Math.random() * 100);
//     this.Lane1FirstAtFinish=Math.floor(Math.random() * 100);
//     this.Lane2FirstAtFinish=Math.floor(Math.random() * 100);
//     this.Lane3FirstAtFinish=Math.floor(Math.random() * 100);
//     this.Lane4FirstAtFinish=Math.floor(Math.random() * 100);
//     this.Lane5FirstAtFinish=Math.floor(Math.random() * 100);
//     this.Lane6FirstAtFinish=Math.floor(Math.random() * 100);

// };



server.get('/', function (req, res){
    console.log("Inbound Request:" , req.query);
    // res.header('Access-Control-Allow-Origin', "*");
    sqlRequest(req, res);
});
