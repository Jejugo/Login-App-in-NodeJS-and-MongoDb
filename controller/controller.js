var express = require('express');
var bodyParser = require('body-parser');
var Usuario = require('../models/usuario');



var urlencodedParser = bodyParser.urlencoded({extended: false});
var error = [{msg: ''}];
var success = {msg: ''};

module.exports = function(app){
	// --> GETS THE URL NEEDED
	app.get('/login', function(req, res){
		
		res.render('login', {error: error, success: success});
	});

	app.get('/login/:name', function(req, res){
		Usuario.find({usuario: req.params.name}).then(function(){
			res.render('index', {data: data});
		});
	});



	// --> FORMS SUBMITIONS
	app.post('/login', urlencodedParser, function(req, res){


	});

	app.post('/signup', urlencodedParser, function(req, res){
		Usuario.find({nome: req.body["nome"]}).then(function(result){
			if (result.length == 0){
				req.checkBody('nome', 'Name is required').notEmpty();
				req.checkBody('pass', 'Password is required').notEmpty();
				// isEmail(), equals(req.body.password)

				var errors = req.validationErrors();
				if(errors){
			
					res.render('login', {error: errors, success: success});

				}
				else{
					var newUser = new Usuario({
						usuario: req.body["nome"],
						pass: req.body["pass"]
					});

					Usuario.createUser(newUser, function(err, user){
						if (err) throw err;
						console.log(err);
					});


					success.msg = 'Successfully Registered!!';
					res.render('login', {error: error, success: success});
				}
			};
		});
	});
};