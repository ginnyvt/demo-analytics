import { useState, useEffect } from "react";
import axios from "axios";

import Table from "../layouts/Table";

function ProductReport() {
	const [fetchedData, setFetchedData] = useState([]);
	const [year, setYear] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	let fetchedParams = {
		by: "product",
	};

	if (year !== "") {
		fetchedParams.year = year;
	}

	function selectChangeHandler(e) {
		setYear(e.target.value);
	}

	async function fetchData() {
		setIsLoading(true);
		try {
			const { data } = await axios({
				method: "GET",
				url: "http://localhost:8000/api/reports/sales",
				params: fetchedParams,
			});
			const transformedData = data.data.map((item, index) => {
				return {
					...item,
					productId: index + 1,
				};
			});
			setIsLoading(false);
			setFetchedData(transformedData);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		const controller = new AbortController();
		fetchData();

		return () => controller.abort();
	}, [year]);

	function yearDropdown() {
		return (
			<div className="flex items-center justify-between">
				<h3 className="font-semibold">Product Report</h3>
				<div>
					<select className="select select-secondary" id="year" onChange={selectChangeHandler} value={year}>
						<option value="2022">2022</option>
						<option value="2021">2021</option>
						<option value="2020">2020</option>
						<option value="2019">2019</option>
						<option value="2018">2018</option>
					</select>
				</div>
			</div>
		);
	}

	if (isLoading) {
		return (
			<>
				{yearDropdown()}
				<p>Loading...</p>
			</>
		);
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<>
			{yearDropdown()}
			{fetchedData.length > 0 && <Table data={fetchedData}></Table>}
			{fetchedData.length === 0 && <p>No data available.</p>}
		</>
	);
}

export default ProductReport;
