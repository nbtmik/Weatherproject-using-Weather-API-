const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const querry = req.body.cityname;
    const appid = "2d744c86693d3cfae4c1dca41f351352";
    const unit = "metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+querry+"&appid="+appid+"&units="+unit;
https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        // console.log(data);
        const weatherdata = JSON.parse(data);
        // console.log(weatherdata);
        const temp = weatherdata.main.temp;
        const des = weatherdata.weather[0].description;
        const icon = weatherdata.weather[0].icon;
        const imgicon = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<h1>Temperature of the "+querry+" is "+temp+" .</h1>");
        res.write("<h1>Description of weather "+des+" .</h1>");
        res.write("<img src="+imgicon+">");
        res.send();
    });
});
});


// const url="https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=2d744c86693d3cfae4c1dca41f351352&units=metric";
// https.get(url,function(response){
//     console.log(response.statusCode);

//     response.on("data", function(data){
//         // console.log(data);
//         const weatherdata = JSON.parse(data);
//         // console.log(weatherdata);
//         const temp = weatherdata.main.temp;
//         const des = weatherdata.weather[0].description;
//         const icon = weatherdata.weather[0].icon;
//         const imgicon = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
//         res.write("<h1>Temperature of the kolkata is "+temp+" .</h1>");
//         res.write("<h1>Description of weather "+des+" .</h1>");
//         res.write("<img src="+imgicon+">");
//         res.send();
//     });
// });



app.listen(3000,function(){
    console.log("Port 3000 started");
})