var config = require('./config'),
	http = require('http'),
	path = require('path'),
	express = require('express'),
	// session = require('express-session'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	sha1 = require('sha1'),
	ejs = require('ejs'),
	expressLayouts = require('express-ejs-layouts');

var app = express();

app.set('port',process.env.PORT || config.port);
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');

// app.use(session({secret: 'blogapps-nodejs', saveUninitialized: true, resave: true}));
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var corsOptions = {
	origin: config.host_cors,
	credentials: true
}
app.use(cors(corsOptions));

// Require module database with MongoDB
require('./Models/db');

// Require module email
require('./Controllers/MailerController')(app);

require('./router')(app);

app.listen(app.get('port'), function(){
	console.log("Server running on port "+ app.get('port'));
});
