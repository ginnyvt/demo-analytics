const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	return res.send("Received a GET HTTP method");
});

const PORT = process.env.port || 8000;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
