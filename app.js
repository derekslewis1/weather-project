
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {

    const query = req.body.cityName;

    const apiKey = "appid=4c6621d43001251d498d8e8c96d3fabd";

    const units = "imperial";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&" + apiKey + "&units=" + units;
    https.get(url, function (response) {


        response.on("data", function (data) {

            const weatherData = JSON.parse(data);

            // console.log(weatherData);

            const temp = weatherData.main.temp;

            const description = weatherData.weather[0].description;

            const icon = weatherData.weather[0].icon;

            const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>The temperature in " + query + " is currently " + temp + " degrees farhenheit.</h1>");
            res.write("<p>The weather is currently " + description + " right now.</p>");
            res.write("<img src=" + imageURL + ">");


        })

    })


});



app.listen(3000, function () {
    console.log("Server is running on port 3000");
});