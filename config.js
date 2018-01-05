var config = {}

config.userName = process.env.SQL_username 
config.password = process.env.SQL_password  
config.server = process.env.SQL_Server 
config.options = {encrypt: true, database: process.env.SQL_Server_DB } 

module.exports = config;
