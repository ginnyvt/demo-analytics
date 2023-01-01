const router = require("express").Router();

const { upload } = require("../controllers/upload.controller");
const uploadFile = require("../middleware/upload");

router.post("/upload", uploadFile.single("demo"), upload);

module.exports = router;
