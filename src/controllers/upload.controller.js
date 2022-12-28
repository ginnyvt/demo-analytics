const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const { sendToDb, transformData } = require("../../utils/process_data");

async function upload(req, res) {
	try {
		if (req.file === undefined) {
			return res.status(400).send({
				message: "Please upload a CSV file!",
			});
		} else {
			let parsedData = [];
			const inputPath = path.join(__dirname, "../uploads/" + req.file.filename);
			fs
				.createReadStream(inputPath)
				.pipe(
					parse({
						delimiter: ",",
						from_line: 2,
					})
				)
				.on("data", (row) => {
					const transformedRow = transformData(row);
					console.log(transformedRow);
					parsedData.push(transformedRow);
					if (parsedData.length === 20000) {
						sendToDb(parsedData);
						parsedData = [];
					}
				})
				.on("error", (error) => {
					throw new Error(error.message);
				})
				.on("end", () => {
					sendToDb(parsedData);
					console.log("Finished");
					fs.unlinkSync(inputPath);
					return res.status(201).send({
						message: "Import data to database succeeded",
					});
				});
		}
	} catch (error) {
		res.status(500).send({
			message: "Failed to import data to database",
		});
	}
}

module.exports = { upload };
