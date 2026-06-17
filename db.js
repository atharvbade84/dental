var mysql=require('mysql2');
var util=require('util');

var conn=mysql.createConnection({
    host:'bkxofqkezwzm7kor9knr-mysql.services.clever-cloud.com',
    user:'ucyfefzmh0q0oxuz',
    password:'Zrh9DzSaLS3NwXnm4501',
    database:'bkxofqkezwzm7kor9knr'
});

var exe=util.promisify(conn.query).bind(conn);

module.exports=exe;
