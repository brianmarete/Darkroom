const express = require("express");
const mongoose = require("mongoose");

const upload = require("./upload");
const Photo = require("./models/photos");

const mongodb_url = "mongodb://localhost/";
const dbName = "darkroom";

const MONGODB_URI = process.env.MONGODB_URI || mongodb_url + dbName;
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;

db.once("open", () => {
  console.log("Database connected successfully");
});

db.on("error", (error) => {
  console.log(error);
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  Photo.find({}, (error, photos) => {
    if (error) {
      console.log(error);
    } else {
      res.render("index", { photos });
    }
  });
});

app.post("/upload", (req, res) => {
  console.log(req.file);
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.render("index", { message: err });
    } else if (req.file === undefined) {
      res.render("index", { message: "No file selected" });
    } else {
      console.log(req.file);

      const newPhoto = new Photo({
        name: req.file.filename,
        path: "images/" + req.file.filename,
        size: req.file.size,
      });

      newPhoto.save();

      res.redirect("/");
    }
  });
});

//display one photo
app.get("/image/:id", (req, res) => {
  Photo.findById(req.params.id, (error, photo) => {
    if (error) {
      console.log(error);
    } else {
      console.log(photo);
      res.render("single_photo", { photo });
    }
  });
});

//updating a photo
app.put("/image/:id", (req, res) => {
  Photo.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
      },
    },
    { upsert: true },
    (err, photo) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
});

//deleting a photo
app.delete("/image/:id", (req, res) => {
  Photo.deleteOne({ _id: req.params.id }, (error) => {
    if (error) {
      console.log(error);
    } else {
      res.send("Success");
    }
  });
});

app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`);
});
