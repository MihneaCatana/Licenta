const UserDb = require("../models").User;

const controller = {
  userAuth: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await UserDb.findOne({ email: email, password: password });

      if (user) {
        res.status(200).send({ message: "Autentificare realizata cu succes!" });
      } else {
        res.status(404).send({ message: "Credentiale gresite!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Server error!" });
    }
  },

  getAllUsers: async (req, res) => {
    UserDb.findAll()
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },
};

module.exports = controller;
