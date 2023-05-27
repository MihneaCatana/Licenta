const express = require("express");
const router = express.Router();
const commentController = require("../controller").comment;

router.post("/create", commentController.createComment);

router.get("/", commentController.getAllComments);

router.get("/:id", commentController.getCommentById);

router.get("/task/:idTask",commentController.getCommentByTaskId);

router.put("/:id", commentController.updateCommentById);

router.delete("/:id", commentController.deleteComment);

module.exports = router;
