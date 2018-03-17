var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./routes/routes.js')(app);

app.listen(app.get('port'), function() {
  console.log('Url-Monitor running on port: ' + app.get('port'));
});

module.exports = app;
