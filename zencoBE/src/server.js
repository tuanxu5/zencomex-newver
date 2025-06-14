require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const connectionDatabase = require("./config/connectDB");
const configCors = require("./config/cors");
const configViewEngine = require("./config/viewEngine");
const initApiRoutes = require("./routes/api");
const initWebRoutes = require("./routes/web");
const compression = require("compression");

const app = express();
const PORT = process.env.PORT || 8080;

//
app.use(compression());

// config CORS
configCors(app);

//config view engine
configViewEngine(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// config cookie parser
app.use(cookieParser());

// init web routes
initWebRoutes(app);
//init api routes
initApiRoutes(app);
//DB
connectionDatabase();

app.use((req, res) => {
  return res.send("404 not found");
});

app.listen(PORT, () => {
  console.log(">>>> Zenco Backend is running on port = " + PORT);
});
