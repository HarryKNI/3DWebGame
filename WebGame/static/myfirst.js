const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('static'));
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



app.get('/index.html', (req,res) => { 
    res.sendFile(__dirname +'/index.html')
});

app.get('/game.html', (req,res) => { 
    res.sendFile(__dirname +'/HTML/game.html')
});

app.get('/Log-in.html', (req,res) => { 
    res.sendFile(__dirname +'/HTML/Log-in.html')
});

app.get('/Sign-up.html', (req,res) => { 
    res.sendFile(__dirname +'/HTML/Sign-up.html')
});

app.get('/home.html', (req,res) => { 
    res.sendFile(__dirname +'/HTML/home.html')
});


app.get('/game.js', (req,res) => { 
    res.sendFile(__dirname +'/js/game.js')

});

app.get('/skybox.png', (req,res) => { 
    res.sendFile(__dirname +'/resources/img/Skybox.png')

});

app.get('/ShipFloor.png', (req,res) => { 
    res.sendFile(__dirname +'/resources/img/ShipFloor.png')

});
app.get('/iron.png', (req,res) => { 
    res.sendFile(__dirname +'/resources/img/iron.png')

});

app.get('/gameStyle.css', (req,res) => { 
    res.sendFile(__dirname +'/css/gameStyle.css')

});

app.get('/home.css', (req,res) => { 
    res.sendFile(__dirname +'/css/home.css')

});

app.get('/indexStyle.css', (req,res) => { 
    res.sendFile(__dirname +'/css/indexStyle.css')

});

app.get('*', function(req,res){

    console.log(__dirname);
    res.status(404).sendFile(__dirname+'/404page.html');



});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    });