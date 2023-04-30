const statusTaskDb = require("../models").StatusTask;

const controller = {
  getAllStatuts: async (req, res) => {
    await statusTaskDb
      .findAll()
      .then((statuses) => {
        res.status(200).send(statuses);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getStatusById: async (req, res) => {
    try {
      const status = await statusTaskDb.findOne({
        where: { id: req.params.id },
      });

      if (status) {
        res.status(200).send(status);
      } else {
        res.status(404).send({ message: "Status not found!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Server error!" });
    }
  },

  createStatus: async (req, res) => {
    const existentStatus = await statusTaskDb.findOne({
      where: { name: req.body.name },
    });

    if (existentStatus) {
      res.status(406).send({ message: "Status already exists!" }); //406 - Not Acceptable
      return;
    }

    if (!req.body.name) {
      res.status(411).send({ message: "Name required!" }); //411 - Length Required
      return;
    }
    try {
      const status = await statusTaskDb.create({
        name: req.body.name,
      });
      res.status(200).send(status);
    } catch (error) {
      res.status(500).send({ message: "Server error!" });
    }
  },

  updateStatusById: async (req, res) => {
    try {
      const status = await statusTaskDb.findOne({
        where: { id: req.params.id },
      });

      if (status) {
        if (req.body.name) {
          status.name = req.body.name;
        }

        await status.save();

        res.status(200).send(status);
      } else {
        res.status(404).send({ message: "Status not found!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Server error!" });
    }
  },

  deleteStatus: async (req, res) => {
    const status = await statusTaskDb.findOne({
      where: { id: req.params.id },
    });

    if (status) {
      await status.destroy();
      res.status(200).send({
        message: `Status with id ${req.params.id} was destroyed! `,
      });
    } else {
      res.status(404).send({ message: "Status was not found ! " });
    }
  },
};

module.exports = controller;
