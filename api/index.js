const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {default: mongoose} = require("mongoose");
require("dotenv").config();
const cookieparser = require("cookie-parser");

const userModel = require("./models/userModel");

const bcrpytSalt = bcrypt.genSaltSync(12);
const jwtSecret = "asduiahbnsuirbausd";

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    origin: "http://127.0.0.1:5173",
  })
);

mongoose.connect(process.env.MONGODB_URI);

app.get("/test", (req, res) => {
  res.json("working");
});

// !Register User
try {
  app.post("/register", async (req, res) => {
    const {name, email, password} = req.body;
    const user = await userModel.create({
      fullname: name,
      email,
      password: bcrypt.hashSync(password, bcrpytSalt), //! Encrypting password
    });

    res.json(user);
  });
} catch (error) {
  res.status(422).json(e);
}

// !Login User

app.post("/login", async (req, res) => {
  const {email, password} = req.body;
  const user = await userModel.findOne({email});

  if (user) {
    //! Comparing Passwords with Bcrypt
    const passOk = bcrypt.compareSync(password, user.password);

    if (passOk) {
      //! If Password matches, we login
      jwt.sign(
        {email: user.email, id: user._id},
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;

          res.cookie("token", token).json(user);
        }
      );
    } else {
      res.status(422).json("Password Wrong");
    }
  } else {
    res.status(422).json("account not found");
  }
});

// !Profile
app.get("/profile", (req, res) => {
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const {fullname, email, _id} = await userModel.findById(user.id);
      res.json({fullname, email, _id});
    });
  } else {
    res.json(null);
  }
});

// !Logout Route
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.listen(4000);
