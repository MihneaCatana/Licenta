const DepartmentDb = require("../models").Department;

const controller = {
    getAllDepartments: async (req, res) => {
        await DepartmentDb.findAll()
            .then((departments) => {
                res.status(200).send(departments);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({message: "Server error!"});
            });
    },

    getDepartmentById: async (req, res) => {
        try {
            const department = await DepartmentDb.findOne({
                where: {id: req.params.id},
            });

            if (department) {
                res.status(200).send(department);
            } else {
                res.status(404).send({message: "Department not found!"});
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Server error!"});
        }
    },

    getDepartmentByName: async (req, res) => {
        try {

            const department = await DepartmentDb.findOne({
                where: {name: req.params.name}
            })

            if (department) {
                res.status(200).send(department)
            } else {
                res.status(200).send(null)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({message: "Server error!"})
        }

    },

    createDepartment: async (req, res) => {
        const existentDepartment = await DepartmentDb.findOne({
            where: {name: req.body.name},
        });

        if (existentDepartment) {
            res.status(406).send({message: "Department already exists!"}); //406 - Not Acceptable
            return;
        }

        if (!req.body.name) {
            res.status(411).send({message: "Name required!"}); //411 - Length Required
            return;
        }
        try {
            const department = await DepartmentDb.create({
                name: req.body.name,
            });
            res.status(200).send(department);
        } catch (error) {
            res.status(500).send({message: "Server error!"});
        }
    },

    updateDepartmentById: async (req, res) => {
        try {
            const department = await DepartmentDb.findOne({
                where: {id: req.params.id},
            });

            if (department) {
                if (req.body.name) {
                    department.name = req.body.name;
                }

                await department.save();

                res.status(200).send(department);
            } else {
                res.status(404).send({message: "Department not found!"});
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Server error!"});
        }
    },

    deleteDeparment: async (req, res) => {
        const department = await DepartmentDb.findOne({
            where: {id: req.params.id},
        });

        if (department) {
            await department.destroy();
            res.status(200).send({
                message: `Department with id ${req.params.id} was destroyed! `,
            });
        } else {
            res.status(404).send({message: " Department was not found ! "});
        }
    },
};

module.exports = controller;
