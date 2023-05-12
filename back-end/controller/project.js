const ProjectDb = require("../models").Project;

const controller = {
  getAllProjects: async (req, res) => {
    await ProjectDb.findAll()
      .then((projects) => {
        res.status(200).send(projects);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getProjectById: async (req, res) => {
    try {
      const project = await ProjectDb.findOne({
        where: { id: req.params.id },
      });

      if (project) {
        res.status(200).send(project);
      } else {
        res.status(404).send({ message: "Project not found!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Server error!" });
    }
  },

  createProject: async (req, res) => {
    const existentProject = await ProjectDb.findOne({
      where: { name: req.body.name },
    });

    if (existentProject) {
      res.status(406).send({ message: "Project already exists!" }); //406 - Not Acceptable
      return;
    }

    if (!req.body.name) {
      res.status(411).send({ message: "Name required!" }); //411 - Length Required
      return;
    }
    try {
      const project = await ProjectDb.create({
        name: req.body.name,
        startDate: new Date(Date.now()),
      });
      res.status(200).send(project);
    } catch (error) {
      res.status(500).send({ message: "Server error!" });
    }
  },

  updateProjectById: async (req, res) => {
    try {
      const project = await ProjectDb.findOne({
        where: { id: req.params.id },
      });

      if (project) {
        if (req.body.name) {
          project.name = req.body.name;
        }

        await project.save();

        res.status(200).send(project);
      } else {
        res.status(404).send({ message: "Project not found!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Server error!" });
    }
  },

  deleteProject: async (req, res) => {
    const project = await ProjectDb.findOne({
      where: { id: req.params.id },
    });

    if (project) {
      await project.destroy();
      res.status(200).send({
        message: `Project with id ${req.params.id} was destroyed! `,
      });
    } else {
      res.status(404).send({ message: " Project was not found ! " });
    }
  },
};

module.exports = controller;
