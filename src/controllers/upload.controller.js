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
				.on("data", async (row) => {
					const transformedRow = transformData(row);
					if (transformedRow[4] >= 0) {
						parsedData.push(transformedRow);
					}

					if (parsedData.length === 20000) {
						await sendToDb(parsedData);
						parsedData = [];
					}
				})
				.on("error", (error) => {
					throw error;
				})
				.on("end", async () => {
					await sendToDb(parsedData);
					console.log("Finished");
					fs.unlinkSync(inputPath);
					res.status(200).send({ message: "Succeeded!" });
				});
		}
	} catch (error) {
		return res.status(500).send({
			message: "Failed to import data to database.",
		});
	}
}

module.exports = { upload };
