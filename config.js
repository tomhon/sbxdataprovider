var config = {}

config.userName = process.env.SQL_username || 'coppermountain';
config.password = process.env.SQL_password || 'PyeongChang2018' ; 
config.server = process.env.SQL_Server || 'sportstracking.database.windows.net';
config.options = {encrypt: true, database: process.env.SQL_Server_DB || 'sbxtracker'} 

module.exports = config;
