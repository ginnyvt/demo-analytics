import { Link } from "react-router-dom";

function Home() {
	return (
		<>
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content text-center">
					<div className="max-w-md">
						<h1 className="text-4xl font-bold">Welcome to Analytics</h1>
						<p className="py-6">
							Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti
							eaque aut repudiandae et a id nisi.
						</p>
						<button className="btn btn-primary">
							<Link to="/upload">Get started</Link>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
