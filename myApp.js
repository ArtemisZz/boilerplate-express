
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// --> 7)  Mount the Logger middleware here

app.use(function middleware(req, res, next) {
    // Do something
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    // Call the next function in line:
    next();
  });

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
app.get("/1",function(req,res){
    res.send("Hello Express");
});

/** 3) Serve an HTML file */
app.get("/", function(req, res){
    res.sendFile(__dirname + "/views/index.html");
})

/** 4) Serve static assets  */
app.use(express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route */

app.get("/json", function(req, res){
    res.json({message : "Hello json"});
});

/** 6) Use the .env file to configure the app */
/*
app.get("/json", function(req, res){
    let response = "Hello json";
    if(process.env.MESSAGE_STYLE === "uppercase"){
        response = response.toUpperCase();
    }
    res.json({message : response});
});
 */
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get('/now', function(req, res, next) {
    req.time = new  Date().toString();  // Hypothetical synchronous operation
    next();
  }, function(req, res) {
    res.json({time: req.time});
  });

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", function(req,res){
    var word = req.params.word; 
    res.json({echo : word});
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get("/name", function(req, res){
    var firstname = req.query.first;
    var lastname = req.query.last;
    var name = firstname + ' ' + lastname;
    res.json({name : name});
});
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */


app.listen(8000);
// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
