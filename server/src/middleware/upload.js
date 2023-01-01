const multer = require("multer");
const path = require("path");

const outputPath = path.join(__dirname, "../uploads/");

function csvFilter(req, file, cb) {
	if (file.mimetype.includes("csv")) {
		cb(null, true);
	} else {
		cb("Please upload only csv file.", false);
	}
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, outputPath);
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const uploadFile = multer({ storage, fileFilter: csvFilter });
module.exports = uploadFile;
