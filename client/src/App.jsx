import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Error from "./components/layouts/Error";
import Layout from "./components/layouts/Layout";

import Reports from "./components/reports/Reports";
import StoreReport from "./components/reports/StoreReport";
import ProductReport from "./components/reports/ProductReport";
import UploadFile from "./components/UploadFile";

function App() {
	return (
		<>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="home" element={<Home />} />
					<Route path="upload" element={<UploadFile />} />

					<Route path="reports" element={<Reports />}>
						<Route path="store" element={<StoreReport />} />
						<Route path="product" element={<ProductReport />} />
						<Route path="*" element={<Error />} />
					</Route>
					<Route path="*" element={<Error />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
