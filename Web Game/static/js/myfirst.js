const express = require('express');
const app = express();
const port = 3000;
var mysql = require('mysql');
var con = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "cmp5360"
});
con.connect(function(err) {
 if (err) throw err;
 console.log("Connected!");
 con.query("SELECT * FROM user", function (err, result, fields) {
 if (err) throw err;
 console.log(result);
});
});
app.get('/', (req, res) => {
res.send('Hello World!')
})
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})

app.use(express.static('static'));

app.get('/index', function(req,res){
    res.sendFile(_dirname +'/index.html');
});
