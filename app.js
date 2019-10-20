var express = require("express");
var app = express(); 
var request = require("request");

app.use(express.static("public"));

app.set("view engine", "ejs"); 


app.get("/", function(req, res){
    res.render("landing"); 
});


var symbol = ["MSFT", "AAPL", "NFLX"]; 

app.get("/stocks", function(req,res){ 
    var url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
    var apiKey = "&apikey=TW9KQVDE3VVOLZMO";
    request(url + symbol[1] + apiKey,
       function(error,response, body){
          if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            //console.log(data["Time Series (Daily)"]["2019-10-18"]);
            res.render("stockpage", {data: data});
            
          }
       }); 
        
 });


app.listen(3000, '127.0.0.1', function(){ //starts server --> This is for me when debbuging
    console.log("Server has started on port 3000"); 
});

