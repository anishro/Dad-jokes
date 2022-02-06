//jshint esversion: 6

const bodyParser = require("body-parser");
const https = require("https");
const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const options = {
    method: "GET",
    hostname: "dad-jokes.p.rapidapi.com",
    port: null,
    path: "/random/joke",
    url: "https://dad-jokes.p.rapidapi.com/dark/joke",
    headers: {
      "x-rapidapi-host": "dad-jokes.p.rapidapi.com",
      "x-rapidapi-key": "204acc9554msh8836f5045b00346p1aa394jsn88f651765729",
      useQueryString: true,
    },
  };
  const request = https.request(options, function (response) {
    const chunks = [];
    res.setHeader("Content-Type", "text/html");
    response.on("data", function (data) {
      const joke = JSON.parse(data);
      console.log(res.statusCode);
      console.log(data);
      var setup = joke.body[0].setup;
      var punchline = joke.body[0].punchline;
      // const setup = joke.body[0].setup;
      // const punchline = joke.body[0].punchline;
      res.render("jokes", { setup: setup, punchline: punchline });
    });

    response.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });
  request.end();
});

app.listen(3000, function () {
  console.log("server is live at localhost:3000");
});
