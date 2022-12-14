const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { username, email, password, password1 } = req.body;
  const errors = [];

  if (!username || !email || !password || !password1) {
    errors.push({ mgs: "Please fill out the form" });
  }
  if (password != password1) {
    errors.push({ msg: "Passwords do not match" });
  }
  if (password.length < 6) {
    errors.push({ msg: "Password should be atleast 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      username,
      email,
      password,
      password1,
    });
  } else {
    res.send("pass");
  }
  console.log(errors);
});

module.exports = router;
