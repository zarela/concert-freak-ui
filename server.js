var express = require('express');
var app     = express();
var path    = require('path');

app.use(express.static(path.join(__dirname, 'public')));

//Routing
app.get('/', function(req, res){
  res.send("Hello World");
  // res.render('index');
});

//Port listener
app.listen(process.env.PORT || 4000, function(){
  console.log("=============================");
  console.log("SERVER LISTENING ON PORT 4000");
  console.log("=============================");
});
