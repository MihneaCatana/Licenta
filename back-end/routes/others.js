const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const othersController = require("../controller").others;

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../front-end/src/assets/profile_pictures')
    },

    filename: (req, file, callback) => {
        const fileExtension = path.extname(file.originalname);

        // callback(null, req.body.fileName + fileExtension)
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
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

module.exports = router;
