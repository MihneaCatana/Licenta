const connection = require("../models").connection;
const UserDb = require("../models").User;

const controller = {
  resetDB: (req, res) => {
    connection
      .sync({ force: true })
      .then(() => {
        // TO ADD Initial accounts

        UserDb.create({
          email: "admin@gmail.com",
          password: "1234567",
          idStatus: 3,
        });

        res.status(201).send({ message: "Database reset!" });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Database reset failed!", err: err.message });
      });
  },
};

module.exports = controller;
