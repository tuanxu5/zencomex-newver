require("dotenv").config();

const configCors = (app) => {
  const allowedOrigins = [process.env.REACT_URL, "https://zencomex.com", "https://www.zencomex.com"].filter(Boolean);
  // Add headers before the routes are defined
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    const origin = req.headers.origin;
    const isAllowed = allowedOrigins.includes(origin);

    if (isAllowed) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,Authorization");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    if (req.method === "OPTIONS") {
      if (isAllowed) {
        return res.sendStatus(200);
      }
      return res.sendStatus(403);
    }
    // Pass to next layer of middleware
    next();
  });
};

module.exports = configCors;
