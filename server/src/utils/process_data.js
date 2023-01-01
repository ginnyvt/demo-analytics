const sql = require("../db");
const moment = require("moment");

const _ = require("lodash");

async function sendToDb(data) {
	let sqlQuery = "INSERT INTO sales (store, product, sales_day, sales_time, sales_amount) VALUES ?";

	sql.query(sqlQuery, [data], (error, response) => {
		if (error) {
			throw new Error(error.message);
		}
	});
}

function transformData(data) {
	let transformedData = [];
	if (!_.isEmpty(data[0])) {
		transformedData[0] = data[0];
	}
	if (!_.isEmpty(data[1])) {
		transformedData[1] = data[1];
	}
	if (!_.isEmpty(data[2])) {
		const datetime = moment(data[2]);
		const date = datetime.format("YYYY-MM-DD");
		const time = datetime.format("HH:mm:ss");
		transformedData[2] = date;
		transformedData[3] = time;
	}

	if (!_.isEmpty(data[3]) && isNumeric(data[3])) {
		transformedData[4] = +data[3];
	}

	return transformedData;
}

function isNumeric(str) {
	if (typeof str != "string") return false;
	return !isNaN(str) && !isNaN(parseFloat(str));
}
module.exports = { sendToDb, transformData };
