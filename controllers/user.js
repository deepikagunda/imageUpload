var async = require("async");
var User = require("../models/User");
var mongoose = require("mongoose");
var fs = require("fs");
const fileType = require("file-type");

exports.accountGet = function(req, res) {
 
  User.findOne({ email: req.session.email }, function(err, user) {
    if (err) {
      console.log("err" + err);
      res.render("profile", {
        title: "My Account"
      });
    } else if (user && "picPath" in user) {
      if (fs.existsSync(req.rootPath + user.picPath)) {
        let img = fs.readFileSync(req.rootPath + user.picPath);
        let mime = fileType(img);
        img = new Buffer(img, "binary").toString("base64");
       
        res.render("profile", {
          title: "My Account",
          mime: mime.mime,
          img: img,
          name: user.name,
          email: user.email
        });
      } else {
        res.render("profile", {
          title: "My Account",
          name: user.name,
          email: user.email
        });
      }
    } else {
      res.render("profile", {
        title: "My Account",
        name: "",
        email: ""
      });
    }
  });
};
exports.uploadPhoto = function(req, res) {
  var base64Data = req.body.imgBase64.replace(/^data:image\/jpeg;base64,/, "");
  var path = "." + req.body.fileName;
  fs.writeFile(path, base64Data, "base64", function(err) {
    if (err) {
      console.log(err);
    } else {
      res.send("success");
    }
  });
};

exports.accountPut = function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    console.log(JSON.stringify(user));
    if (err) {
      console.log("err"+err);
    } else if (user) {
      user.email = req.body.email;
      user.picPath = req.body.picPath;
      
    } else {
      var user = new User();
      user.email = req.body.email;
      user.name = req.body.name;
      user.picPath = req.body.picPath;
      console.log("in else" + req.body.picPath);
    }
    user.save(function(err, user) {
      if (err) {
        console.log(err);
      } else {
        
        req.session.email = req.body.email;
       
        req.session.save(function(err) {
          // session saved
          if (err) {
            console.log("error while saving sesion");
          }
        });
      }
    });
    res.redirect("/");
  });
};
