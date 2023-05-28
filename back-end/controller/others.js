const connection = require("../models").connection;
const UserDb = require("../models").User;
const statusUserDb = require("../models").StatusUser;
const statusTaskDb = require("../models").StatusTask;
const DepartmentDb = require("../models").Department;
const TaskDb = require("../models").Task;
const ProjectDb = require("../models").Project;
const CommentDb = require("../models").Comment;
const bcrypt = require('bcrypt')

const controller = {
  resetDB:async (req, res) => {
    connection
      .sync({ force: true })
      .then( async () => {
          // TO ADD Initial accounts

          // STATUS USER

          statusUserDb.create({
              name: "EMPLOYEE",
          });

          statusUserDb.create({
              name: "MANAGER",
          });

          statusUserDb.create({
              name: "ADMIN",
          });

          // STATUS TASKS

          statusTaskDb.create({
              name: "UNASSIGNED",
          });

          statusTaskDb.create({
              name: "STARTED",
          });

          statusTaskDb.create({
              name: "IN PROGRESS",
          });

          statusTaskDb.create({
              name: "WAITING FOR FEEDBACK",
          });

          statusTaskDb.create({
              name: "COMPLETED",
          });

          statusTaskDb.create({
              name: "CANCELED",
          });

          // DEPARTMENT

          DepartmentDb.create({
              name: "IT",
          });

          DepartmentDb.create({
              name: "Sales",
          });

          DepartmentDb.create({
              name: "Human Resources",
          });

          DepartmentDb.create({
              name: "Marketing",
          });

          DepartmentDb.create({
              name: "Legal",
          });

          // PROJECT

          ProjectDb.create({
              name: "Astral",
              startDate: new Date("2020-08-18"),
          });

          ProjectDb.create({
              name: "Starlight",
              startDate: new Date("2015-11-12"),
          });

          ProjectDb.create({
              name: "Redwood",
              startDate: Date.now(),
          });

          // USER
          const hashedPassword1 = await bcrypt.hash("1234567", 10);
          UserDb.create({
              email: "admin@gmail.com",
              password: hashedPassword1,
              idStatus: 3,
              idDepartment: 4,
              activeAccount: true,
          });

          const hashedPassword2 = await bcrypt.hash("abcdef", 10);
          UserDb.create({
              email: "manager@gmail.com",
              password: hashedPassword2, // Store the hashed password in the database
              idStatus: 2,
              activeAccount: true,
              idDepartment: 3,
          });

          const hashedPassword3 = await bcrypt.hash("parolatare", 10);
          UserDb.create({
              email: "angajat@gmail.com",
              password: hashedPassword3,
              idStatus: 1,
              activeAccount: true,
              idDepartment: 2,
          });

          // TASK

          TaskDb.create({
              name: "Search for parteners",
              description: "Contact at least 10 partners",
              idStatus: 3,
              idUser: 2,
              deadline: new Date("2015-08-12T12:00"),
          });

          TaskDb.create({
              name: "Resolve connection bug",
              description: "Client cant connect to the database",
              idStatus: 2,
              idUser: 3,
              deadline: new Date("2023-11-12T18:00"),
          });


          // COMMENT

          CommentDb.create({
              idUser: "3",
              idTask: "2",
              content: "I need more time to do this task properly!",
          });

          CommentDb.create({
              idUser: "1",
              idTask: "2",
              content:
                  "We need to launch the new marketing campaign in 2 weeks, can you do it in 6 days?",
          });

          CommentDb.create({
              idUser: "3",
              idTask: "2",
              content: "Yes, thanks for understanding!",
          });

          res.status(201).send({message: "Database reset!"});
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Database reset failed!", err: err.message });
      });
  },
};

module.exports = controller;
