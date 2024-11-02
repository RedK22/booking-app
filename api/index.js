const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {default: mongoose} = require("mongoose");
require("dotenv").config();
const cookieparser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const userModel = require("./models/userModel");
const placeModel = require("./models/placeModel");

const bcrpytSalt = bcrypt.genSaltSync(12);
const jwtSecret = "asduiahbnsuirbausd";

app.use(express.json());
app.use(cookieparser());
app.use("/uploads", express.static(__dirname + "/uploads"));
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
  res.status(422).json(error);
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

app.post("/uploadByLink", async (req, res) => {
  const {link} = req.body;
  const newName = "photo" + Date.now() + ".jpg";

  try {
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });
    res.json("uploads/" + newName);
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to upload image", details: error.message}); // Added error handling
  }
});

const photosMiddleware = multer({dest: "uploads"});
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path, originalname} = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});

app.post("/places", (req, res) => {
  const {token} = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;

    const placeDoc = await placeModel.create({
      owner: user.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    res.json(placeDoc);
  });
});

app.get("/places", (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;

    const {id} = user;
    res.json(await placeModel.find({owner: id}));
  });
});

app.get("/places/:id", async (req, res) => {
  const id = req.params;
  placeData = await placeModel.findById(id);
  console.log(placeData);
  res.json();
});

app.listen(4000);
