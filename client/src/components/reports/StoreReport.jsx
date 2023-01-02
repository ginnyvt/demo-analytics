import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

const BASE_URL = import.meta.env.VITE_SERVER_ENDPOINT;

function StoreReport() {
	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

	const [chartData, setChartData] = useState(null);
	const [year, setYear] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	let fetchedParams = {
		by: "store",
	};

	if (year !== "") {
		fetchedParams.year = year;
	}

	const chartOptions = {
		indexAxis: "y",
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Total sales by store",
			},
		},
	};

	function selectChangeHandler(e) {
		setYear(e.target.value);
	}

	async function fetchData() {
		setIsLoading(true);
		try {
			const { data } = await axios({
				method: "GET",
				url: `${BASE_URL}/api/reports/sales`,
				params: fetchedParams,
			});
			setIsLoading(false);

			if (data.data.length > 0) {
				const chartLabels = data.data.map((i) => i.store);
				const dataInChart = data.data.map((i) => i.total_sales);

				const chartData = {
					labels: chartLabels,
					datasets: [
						{
							label: "Total sales",
							data: dataInChart,
							backgroundColor: ["rgba(255, 159, 64, 0.2)"],
							borderWidth: 1,
							borderColor: "rgb(255, 159, 64)",
						},
					],
				};
				setChartData(chartData);
			} else {
				setChartData(null);
			}
		} catch (err) {
			console.log(err);
			setIsLoading(false);
			setError(err.message);
		}
	}

	useEffect(() => {
		const controller = new AbortController();

		fetchData();

		return () => controller.abort();
	}, [year]);

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

	function yearDropdown() {
		return (
			<div className="flex items-center justify-between">
				<h3 className="font-semibold">Store Report</h3>
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

	return (
		<>
			{yearDropdown()}
			{chartData && <Bar data={chartData} options={chartOptions} height={200} width={250}></Bar>}
			{!chartData && <p>No data available.</p>}
		</>
	);
}

export default StoreReport;
