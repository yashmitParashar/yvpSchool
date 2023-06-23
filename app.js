var express=require("express");
var bodyParser=require("body-parser");
const dotenv = reqiure(".dotenv");

dotenv.config();

const mongoose = require('mongoose');
mongoose.connect(process.env.mongoUrl);
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express();


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/contact', function(req,res){
	var name = req.body.name;
	var email =req.body.email;
	var subject = req.body.subject;
	var message =req.body.message;

	var data = {
		"name": name,
		"email":email,
		"subject":subject,
		"message":message
	}
db.collection('contactformdata').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.redirect('contact-success.html');
})


app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('index.html');
}).listen(5500)


console.log("server listening at port 5500");

