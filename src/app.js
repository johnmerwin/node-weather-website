const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// The contents of index.html file in the public folder
// will be displayed when we type localhost:3000 in our
// browser
app.use(express.static(publicDirectoryPath));

// Make express aware of hbs for templating purposes
// This will allow hbs to look in the "views" folder
// and pick the specific file to render depending on
// the route selected.
app.set("view engine", "hbs");

// Templates will be picked up from the folder in
// viewsPath now.
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("/weather", (request, response) => {
  if (!request.query.address) {
    return response.send({
      error: "Please provide an address"
    });
  }
  geocode.geoCodeAddress(request.query.address, (errorMessage, results) => {
    if (errorMessage) {
      return response.send({ error: errorMessage });
    }

    const { latitude, longitude, address } = results;
    //const completeAddress = results.address;

    forecast.getWeatherForecast(
      latitude,
      longitude,
      (errorMessage, weatherResults) => {
        if (errorMessage) {
          return response.send(errorMessage);
        }
        const { temperature, apparentTemperature, summary } = weatherResults;
        response.send({
          address: address,
          forecast: summary,
          temperature: temperature,
          apparentTemperature: apparentTemperature
        });
      }
    );
  });
});

app.get("", (request, response) => {
  response.render("index", {
    title: "Weather",
    welcome: "Welcome to HBS",
    name: "John"
  });
});

app.get("/help", (request, response) => {
  response.render("help", {
    title: "Help",
    message: "Help from hbs",
    name: "John"
  });
});

app.get("/about", (request, response) => {
  response.render("about", {
    title: "About",
    about: "About hbs",
    name: "John"
  });
});

// Handle all requests not handled above
// Notice the wildcard *
app.get("/help/*", (request, response) => {
  response.render("404", {
    title: "Error",
    message: "Help article not found",
    name: "John"
  });
});

// Handle all requests not handled above
// Notice the wildcard *
app.get("*", (request, response) => {
  response.render("404", {
    title: "404 Error - Page not found",
    message: "The page you are looking for is not found",
    name: "John"
  });
});

// Assign the port dynamically & start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Really listening on port ${port}...`);
});

// NOTES
// To send our files to git we need to run the
// "git init" command from the  web-server folder
// That's the root folder of our weather app
