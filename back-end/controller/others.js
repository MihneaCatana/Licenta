const connection = require("../models").connection;
const UserDb = require("../models").User;
const statusUserDb = require("../models").StatusUser;
const statusTaskDb = require("../models").StatusTask;
const DepartmentDb = require("../models").Department;
const TaskDb = require("../models").Task;
const ProjectDb = require("../models").Project;
const CommentDb = require("../models").Comment;
const bcrypt = require('bcrypt')


const multer = require('multer')
const path = require('path')


const controller = {
    resetDB: async (req, res) => {
        connection
            .sync({force: true})
            .then(async () => {
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
                    id: 1,
                    name: "UNASSIGNED",
                });

                statusTaskDb.create({
                    id: 2,
                    name: "STARTED",
                });

                statusTaskDb.create({
                    id: 3,
                    name: "IN PROGRESS",
                });

                statusTaskDb.create({
                    id: 4,
                    name: "WAITING FOR FEEDBACK",
                });

                statusTaskDb.create({
                    id: 5,
                    name: "COMPLETED",
                });

                statusTaskDb.create({
                    id: 6,
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
                    id: 1,
                    name: "Astral",
                    startDate: new Date("2020-08-18"),
                });

                ProjectDb.create({
                    id: 2,
                    name: "Starlight",
                    startDate: new Date("2015-11-12"),
                });

                ProjectDb.create({
                    id: 3,
                    name: "Redwood",
                    startDate: new Date("2018-08-22"),
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

                const hashedPassword4 = await bcrypt.hash("parola123", 10);
                UserDb.create({
                    email: "mihneacatana@gmail.com",
                    password: hashedPassword4,
                    idStatus: 1,
                    activeAccount: true,
                    idDepartment: 1,
                });

                const hashedPassword5 = await bcrypt.hash("andreipopescu", 10);
                UserDb.create({
                    email: "andrei.popescu@gmail.com",
                    password: hashedPassword5,
                    idStatus: 1,
                    activeAccount: true,
                    idDepartment: 1,
                });

                // TASK

                TaskDb.create({
                    name: "Search for parteners",
                    description: "Contact at least 10 partners",
                    idStatusTask: 3,
                    idUser: 2,
                    idProject: 1,
                    finishedTime: new Date("2023-07-08T14:00"),
                    deadline: new Date("2023-08-12T12:00"),
                });

                TaskDb.create({
                    name: "Research for location for team-building",
                    description: "The team prefers a sunny location. The budget for this team-building is 4000 euros",
                    idStatusTask: 5,
                    idUser: 2,
                    finishedTime: new Date("2023-06-01T17:00"),
                    deadline: new Date("2023-07-22T18:00"),
                });

                TaskDb.create({
                    name: "Resolve connection bug",
                    description: "Client cant connect to the database",
                    idStatusTask: 2,
                    idUser: 3,
                    idProject: 2,
                    deadline: new Date("2023-11-12T18:00"),
                });

                TaskDb.create({
                    name: "Refractor code",
                    idStatusTask: 2,
                    idUser: 5,
                    idProject: 3,
                    deadline: new Date("2023-08-12T13:00"),
                });

                TaskDb.create({
                    name: "Analyze code for potential upgrades",
                    idStatusTask: 2,
                    idUser: 5,
                    idProject: 3,
                    deadline: new Date("2023-07-19T17:00"),
                });

                TaskDb.create({
                    name: "Implement CI/CD ",
                    description: "Use the GitLab platform for integrating CI/CD on at least 3 repositories",
                    idStatusTask: 2,
                    idUser: 5,
                    idProject: 1,
                    deadline: new Date("2023-07-04T12:00"),
                });

                TaskDb.create({
                    name: "Meeting with a partner",
                    description: "Talk about a collaboration for the new product",
                    idStatusTask: 2,
                    idUser: 2,
                    idProject: 2,
                    deadline: new Date("2023-06-21T17:00"),
                });

                TaskDb.create({
                    name: "Prepare documentation for the main application",
                    description: "Make a report of each change in the last 6 months",
                    idStatusTask: 2,
                    idUser: 4,
                    idProject: 3,
                    deadline: new Date("2023-07-17T14:00"),
                });

                TaskDb.create({
                    name: "Implement Payment Method through Paypal",
                    description: "Let the user select the PayPal option when he proceds to checkout",
                    idStatusTask: 2,
                    idUser: 4,
                    idProject: 1,
                    deadline: new Date("2023-06-15T19:00"),
                });

                TaskDb.create({
                    name: "Implement Payment Method through Credit Card",
                    description: "Let the user select the Card option when he proceds to checkout",
                    idStatusTask: 2,
                    idUser: 4,
                    idProject: 1,
                    deadline: new Date("2023-06-15T19:00"),
                });

                TaskDb.create({
                    name: "Create account for interns",
                    description: "Create accounts for interns and give them acces",
                    idStatusTask: 1,
                    idProject: 1,
                    deadline: new Date("2023-07-15T19:00"),
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

                CommentDb.create({
                    idUser: "5",
                    idTask: "5",
                    content: "We need a Premium Plan for implementing CI/CD",
                })

                CommentDb.create({
                    idUser: "2",
                    idTask: "5",
                    content: "I will talk with the Financial Department about this",
                })

                res.status(201).send({message: "Database reset!"});
            })
            .catch((err) => {
                res
                    .status(500)
                    .send({message: "Database reset failed!", err: err.message});
            });
    },

};

module.exports = controller;
