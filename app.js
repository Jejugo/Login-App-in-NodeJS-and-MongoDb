const express = require('express');
const controller = require('./controller/controller');
const connection = require('./controller/connection');
const expressValidator = require('express-validator');


connection();

var app = express();

//NAO 100% necessario. Pode ser feito por jquery no front end
app.use(expressValidator({
	errorFormatter: function(param, msg, value){
		var namespace = param.split('.'),
		root = namespace.shift(),
		formParam = root;

		while(namespace.length){
			formParam += '[' + namespace.shift() + ']';
		}
		return{
			param: formParam,
			msg: msg,
			value: value
		};
	}
}));

//setting up view engine
app.set('view engine', 'ejs');

//static files
app.use('/', express.static('public'));

//fire controller
controller(app);

app.listen(3000, function(){
	console.log("The app is running...!!");
});