const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const app = express();

require("./config/passport")(passport);

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

mongoose.set("strictQuery", true);

app.use(expressLayouts);
app.set("view engine", "ejs");

//body-parser
app.use(express.urlencoded({ extended: false }));

//express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/user"));

const PORT = 5000 || process.env.PORT;

app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT:${PORT}`);
});
