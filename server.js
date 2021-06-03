const express = require("express");
var bodyParser = require("body-parser");
const routesHandler = require("./routes/handler");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "1mb" }));

//static files & api data
app.use("/api", routesHandler);
//html webpages
//http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + "/client/public"));

const PORT = 5000;

app.listen(PORT, () =>
	console.log(`Server started on port: http://localhost:${PORT}`)
);
