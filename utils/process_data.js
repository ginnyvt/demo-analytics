const fs = require("fs");
const path = require("path");

const _ = require("lodash");

function sendToDb(data) {
	console.log("Inserting " + data.length);
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
		const datetime = new Date(data[2]);
		const date = datetime.toLocaleDateString();
		const time = datetime.toLocaleTimeString();
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
