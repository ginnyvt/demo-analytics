const _ = require("lodash");
const sql = require("../../databases/db");

async function reportSales(req, res) {
	const year = req.query.year ?? new Date().getFullYear().toString();
	const by = req.query.by ?? "store";

	if (!isNumeric(year) || !["store", "product"].includes(by)) {
		res.status(400).send({
			message: "Invalid request",
		});
	}

	try {
		const sqlQuery = `SELECT SUM(sales_amount) AS total_sales, ${by}, EXTRACT(YEAR FROM sales_day) AS year FROM sales GROUP BY ${by}, year HAVING year = "${year}"`;

		sql.query(sqlQuery, function (err, results) {
			if (err === null) {
				res.status(200).send({
					data: results,
				});
			} else {
				throw new Error(err.message);
			}
		});
	} catch (error) {
		res.status(500).send({
			message: "Something went wrong",
		});
	}
}

function isNumeric(str) {
	if (typeof str != "string") return false;
	return !isNaN(str) && !isNaN(parseFloat(str));
}

module.exports = { reportSales };
