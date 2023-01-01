const router = require("express").Router();

const { reportSales } = require("../controllers/report.controller");

router.get("/sales", reportSales);

module.exports = router;
