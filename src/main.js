let express = require("express");

let app = express();

require("dotenv").config();

app.use(express.json());

let routes = require("./routes");
app.use(routes);

let PORT = process.env.PORT || 9005;

app.listen(PORT, function () {
  console.log("movie app start on port", PORT);
});
