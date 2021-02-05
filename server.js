const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbConfig = require("./config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
	useNewUrlParser : true,
	useUnifiedTopology : true
}).then(()=> {
   		console.log('connected to database');
   })
  .catch(err => {
  	console.log('couldnt connect to database',err);
  	process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

const userRoutes = require('./routes/users.routes.js');
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});