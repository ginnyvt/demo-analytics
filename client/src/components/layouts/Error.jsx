import { Link } from "react-router-dom";

function Error() {
	return (
		<>
			<h2>PAGE NOT FOUND</h2>
			<button>
				<Link to="/">Go back</Link>
			</button>
		</>
	);
}

export default Error;
