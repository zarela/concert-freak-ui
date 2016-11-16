//MODULES
//=============================================
var express = require('express');
var app     = express();
var path    = require('path');

app.use(express.static(path.join(__dirname, 'public')));

//ROUTING
//============================================
app.get('/', function(req, res){
  // res.send("Hello World");
  res.render('index');
});

//Allows $locationProvider to work without #
app.all('/*', function(req, res, next) {
  res.sendFile('/public/index.html', { root: __dirname });
});

//PORT LISTENER
//=============================================
app.listen(process.env.PORT || 4000, function(){
  console.log("=============================");
  console.log("SERVER LISTENING ON PORT 4000");
  console.log("=============================");
});
