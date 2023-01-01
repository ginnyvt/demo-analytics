import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function Reports() {
	const paths = window.location.pathname.split("/");
	const currentPath = paths[2];

	const [activeTab, setActiveTab] = useState(currentPath !== undefined ? currentPath : null);

	const activeClasses = "block bg-white p-4 text-sm font-medium relative border-t border-l border-r border-gray-200";
	const inActiveClasses = "block bg-white p-4 text-sm font-medium text-gray-500 border-b";

	function handleTabStore() {
		setActiveTab("store");
	}

	function handleTabProduct() {
		setActiveTab("product");
	}
	return (
		<section className="container mx-auto p-8">
			<div className="text-sm breadcrumbs mb-5">
				<ul>
					<li>
						<Link to="/home">Home</Link>
					</li>
					<li>Reports</li>
				</ul>
			</div>

			<ul className="flex text-center mb-5">
				<li className="flex-1">
					<Link
						to="/reports/store"
						onClick={handleTabStore}
						className={activeTab === "store" ? activeClasses : inActiveClasses}
					>
						Store
					</Link>
				</li>

				<li className="flex-1">
					<Link
						to="/reports/product"
						onClick={handleTabProduct}
						className={activeTab === "product" ? activeClasses : inActiveClasses}
					>
						Product
					</Link>
				</li>
			</ul>

			<Outlet></Outlet>
		</section>
	);
}

export default Reports;
