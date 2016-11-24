var express = require('express');
var app = express();


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/', function(req, res) {
});

app.get('/api/whoami/', function (req, res) {
  
  var agent = req.headers['user-agent'];
  var i=agent.indexOf('(');
  var j=agent.indexOf(')',i);
  console.warn(i+' '+j);
  var timestamp={
    ipaddress:req.ip.substr(7),
    language:req.headers['accept-language'].split(',')[0],
    software:agent.substr(i+1,j-i-1)
  }
  // console.warn(req);
  
  res.send(JSON.stringify(timestamp)+"\n");
})


