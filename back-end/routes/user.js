const express = require("express");
const router = express.Router();
const userController = require("../controller").user;

router.post("/create", userController.createUser);

router.post("/login", userController.userAuth);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.get("/email/:email", userController.getUserByEmail);

router.put("/:id", userController.updateUserById);

router.put("/activate/:id", userController.activateUserById);

router.put("/deactivate/:id", userController.deactivateUserById);

router.delete("/:id", userController.deleteUser);

module.exports = router;
