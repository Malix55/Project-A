const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const app = express();

//DB config
const db = require("./config/keys.js").MongoUri;

//mongodb connection
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.info("Mongodb Connected........"))
  .catch((err) => console.log(err));

app.use(expressLayouts);
app.set("view engine", "ejs");

//body-parser
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/user"));

const PORT = 5000 || process.env.PORT;

app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT:${PORT}`);
});
