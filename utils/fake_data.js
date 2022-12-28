const { faker } = require("@faker-js/faker");

const fs = require("fs").promises;
const path = require("path");
let data = [];

const outputPath = path.join(__dirname, "./output/fake_data.json");
for (let i = 0; i < 234503; i++) {
	data.push({
		store: faker.address.state(),
		product: faker.commerce.productName(),
		date: faker.date.past(3),
		sales: +faker.finance.amount(-100.0, 250000.0, 4),
	});
}

const write = async (dt) => {
	try {
		await fs.writeFile(outputPath, JSON.stringify(dt, null, 4), {
			encoding: "utf-8",
			flag: "w",
		});
	} catch (error) {
		console.log(error);
	}
};

write(data);
