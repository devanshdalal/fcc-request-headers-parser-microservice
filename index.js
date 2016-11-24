var path = require('path');
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
  var fileName = path.join(__dirname, 'index.html');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});

app.get('/api/whoami/', function (req, res) {
  
  var agent = req.headers['user-agent'];
  var i=agent.indexOf('(');
  var j=agent.indexOf(')',i);
  console.warn(i+' '+j);
  var info={
    ipaddress:req.ip.substr(7),
    language:req.headers['accept-language'].split(',')[0],
    software:agent.substr(i+1,j-i-1)
  }
  
  res.send(info);
})


