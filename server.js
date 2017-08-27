var express=require('express');
var nodemailer = require("nodemailer");
var bodyParser = require('body-parser');
var cors = require('cors');
const sendmail = require('sendmail')();
var app=express();
try {
  const envStat = require('fs').statSync('.env');
  if (envStat.isFile()) {
    require('dotenv').config();
    // console.error('loadng config', process.env.KEEN_PROJECT_ID);
  } else {
    console.log('.env not found');
  }
}
catch (e) {
  console.error('Failed to load env file', e);
}


var corsOptions = {
  origin: 'http://brillmark.s3-website-us-west-1.amazonaws.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(bodyParser.urlencoded({ extended: true })); 

/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.email_user,
        pass: process.env.email_password
    }
});
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/


app.post('/send', cors(corsOptions), function(req,res){
	sendmail({
	    from: req.body.email,
	    to: 'jahidul@brillmark.com, info@brillmark.com',
	    subject: 'contact',
	    html: req.body.message,
	  }, function(err, reply) {
		if (err) {
			console.log(err && err.stack);
			res.end("error");
			
		} else {
			console.dir(reply);
			res.end("sent");

		}
	    
	    
	});
    
});

/*--------------------Routing Over----------------------------*/

app.listen(1337,function(){
    console.log("Express Started on Port 1337");
});
