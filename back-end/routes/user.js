const express = require("express");
const router = express.Router();
const DB = require("../config/db");
const UserModel = require("../models/user");

router.get("/", (req, res) => {
  UserModel.findAll()
    .then((users) => {
      console.log(users);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
