const _ = require("lodash");
const sql = require("../db");

async function reportSales(req, res) {
	const year = req.query.year ?? new Date(2022, 11, 31).getFullYear().toString();
	const by = req.query.by ?? "store";

	if (!isNumeric(year) || !["store", "product"].includes(by)) {
		return res.send({
			message: "Invalid request",
		});
	}

	try {
		const sqlQuery = `SELECT SUM(sales_amount) AS total_sales, ${by}, EXTRACT(YEAR FROM sales_day) AS year FROM sales GROUP BY ${by}, year HAVING year = "${year}"`;

		sql.query(sqlQuery, function (err, results) {
			if (err === null) {
				return res.send({
					data: results,
				});
			} else {
				throw new Error(err.message);
			}
		});
	} catch (error) {
		return res.send({
			message: "Something went wrong",
		});
	}
}

function isNumeric(str) {
	if (typeof str != "string") return false;
	return !isNaN(str) && !isNaN(parseFloat(str));
}

module.exports = { reportSales };
