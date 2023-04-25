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
    await UserDb.findAll()
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getUserById: async (req, res) => {
    try {
      const user = await UserDb.findOne({ where: { id: req.params.id } });

      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: "User not found!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Server error!" });
    }
  },

  createUser: async (req, res) => {
    const existentUser = await UserDb.findOne({
      where: { email: req.body.email },
    });

    if (existentUser) {
      res.status(406).send({ message: "User already exists!" }); //406 - Not Acceptable
      return;
    }

    if (!req.body.email || !req.body.password) {
      res.status(411).send({ message: "Email / Password required!" }); //411 - Length Required
      return;
    }
    try {
      const user = await UserDb.create({
        email: req.body.email,
        password: req.body.password,
        idDepartment: req.body.idDepartment,
        idStatus: req.body.idStatus,
      });

      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: "Server error!" });
    }
  },

  activateUserById: async (req, res) => {
    try {
      const user = await UserDb.findOne({ where: { id: req.params.id } });

      if (user) {
        user.update({ activeAccount: true });
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: "User not found!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Server error!" });
    }
  },

  deactivateUserById: async (req, res) => {
    try {
      const user = await UserDb.findOne({ where: { id: req.params.id } });

      if (user) {
        user.update({ activeAccount: false });
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: "User not found!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Server error!" });
    }
  },

  updateUserById: async (req, res) => {
    try {
      const user = await UserDb.findOne({ where: { id: req.params.id } });

      if (user) {
        const email = req.body.email;
        const password = req.body.password;
        const idDepartment = req.body.idDepartment;
        const idStatus = req.body.idStatus;

        if (email) {
          user.email = email;
        }

        if (password && password.length > 6) {
          user.password = password;
        }

        if (idDepartment) {
          user.idDepartment = idDepartment;
        }

        if (idStatus) {
          user.idStatus = idStatus;
        }

        await user.save();

        res.status(200).send(user);
      } else {
        res.status(404).send({ message: "User not found!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Server error!" });
    }
  },

  deleteUser: async (req, res) => {
    const user = await UserDb.findOne({ where: { id: req.params.id } });

    if (user) {
      await user.destroy();
      res
        .status(200)
        .send({ message: `User with id ${req.params.id} was destroyed! ` });
    } else {
      res.status(404).send({ message: " User was not found ! " });
    }
  },
};

module.exports = controller;
