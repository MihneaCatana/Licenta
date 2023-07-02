const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const othersController = require("../controller").others;

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../front-end/src/assets/')
    },

    filename: (req, file, callback) => {

        callback(null, file.originalname)
    }

})

router.post("/uploadImage", multer({
    storage: storage,
}).single('image'), (req, res) => {

    try {
        res.status(200).send({message: "File uploaded successfully!"})
    } catch (err) {
        res.status(500).send({error: 'Error uploading file. Please try again.'})
    }
});

router.get("/reset", othersController.resetDB);

router.post("/sendMail", othersController.sendEmail);

module.exports = router;
