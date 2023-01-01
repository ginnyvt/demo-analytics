import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import _ from "lodash";

import { useState, useRef, useEffect } from "react";
const tableHeader = {
	productId: "#",
	product: "Product",
	total_sales: "Amount",
};

function Table({ data }) {
	const countPerPage = 25;
	const [value, setValue] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const [collection, setCollection] = useState(_.cloneDeep(data.slice(0, countPerPage)));

	const searchData = useRef(
		_.throttle((val) => {
			const query = val.toLowerCase();
			setCurrentPage(1);
			const filteredData = _.cloneDeep(
				data.filter((item) => item.product.toLowerCase().indexOf(query) > -1).slice(0, countPerPage)
			);
			setCollection(filteredData);
		}, 400)
	);

	useEffect(() => {
		if (!value) {
			updatePage(1);
		} else {
			searchData.current(value);
		}
	}, [value]);

	const updatePage = (p) => {
		setCurrentPage(p);
		const to = countPerPage * p;
		const from = to - countPerPage;
		setCollection(_.cloneDeep(data.slice(from, to)));
	};

	const tableRows = (rowData) => {
		const { key, index } = rowData;
		const tableCell = Object.keys(tableHeader);
		const columnData = tableCell.map((keyD, i) => {
			return <td key={i}>{key[keyD]}</td>;
		});

		return <tr key={index}>{columnData}</tr>;
	};

	const tableData = () => {
		return collection.map((key, index) => tableRows({ key, index }));
	};

	const headRow = () => {
		return Object.values(tableHeader).map((title, index) => <td key={index}>{title}</td>);
	};

	return (
		<div>
			<input
				placeholder="Search product..."
				value={value}
				onChange={(e) => setValue(e.target.value)}
				type="text"
				className="input input-bordered input-primary"
			/>
			<div className="overflow-x-auto m-5">
				<table className="table w-full">
					<thead>
						<tr>{headRow()}</tr>
					</thead>
					<tbody>{tableData()}</tbody>
				</table>
			</div>

			<Pagination
				pageSize={countPerPage}
				onChange={updatePage}
				current={currentPage}
				total={data.length}
				className="text-center"
			/>
		</div>
	);
}
export default Table;
