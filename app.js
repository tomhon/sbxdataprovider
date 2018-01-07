var restify = require('restify');
var sqlRequest = require("./sqlRequest");
var codexRequest = require("./codexRequest");

var server = restify.createServer();
server.use(restify.plugins.queryParser());

server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

server.get('/getCodex', function (req, res){
    console.log("Inbound Request:" , req.query);
    // res.header('Access-Control-Allow-Origin', "*");
    codexRequest(res);

});


server.get('/', function (req, res){
    console.log("Inbound Request:" , req.query);
    // res.header('Access-Control-Allow-Origin', "*");
    sqlRequest(req, res);

});