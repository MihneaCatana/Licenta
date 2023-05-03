const CommentDb = require("../models").Comment;

const controller = {
  getAllComments: async (req, res) => {
    await CommentDb.findAll()
      .then((comments) => {
        res.status(200).send(comments);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getCommentById: async (req, res) => {
    try {
      const comment = await CommentDb.findOne({
        where: { id: req.params.id },
      });

      if (comment) {
        res.status(200).send(comment);
      } else {
        res.status(404).send({ message: "Comment not found!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Server error!" });
    }
  },

  //  TO DO

  createComment: async (req, res) => {
    try {
      const comment = await CommentDb.create({
        content: req.body.content,
        idTask: req.body.idTask,
        idUser: req.body.idUser,
      });
      res.status(200).send(comment);
    } catch (error) {
      res.status(500).send({ message: "Server error!" });
    }
  },

  updateCommentById: async (req, res) => {
    try {
      const comment = await CommentDb.findOne({
        where: { id: req.params.id },
      });

      if (comment) {
        if (req.body.content) {
          comment.content = req.body.content;
        }

        await comment.save();

        res.status(200).send(comment);
      } else {
        res.status(404).send({ message: "Comment not found!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Server error!" });
    }
  },

  deleteComment: async (req, res) => {
    const comment = await CommentDb.findOne({
      where: { id: req.params.id },
    });

    if (comment) {
      await comment.destroy();
      res.status(200).send({
        message: `Comment with id ${req.params.id} was destroyed! `,
      });
    } else {
      res.status(404).send({ message: " Department was not found ! " });
    }
  },
};

module.exports = controller;
