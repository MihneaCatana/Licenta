const express = require("express");
const router = express.Router();
const { db } = require("../models");

router.get("/reset", (req, res) => {
  db.sequelize.sync({ force: true })
    .then(() => res.status(201).send({message:"Database reset!"}))
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Database reset failed!", err: err.message });
    })
});

module.exports = router;
