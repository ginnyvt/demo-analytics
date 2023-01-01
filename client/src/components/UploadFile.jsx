import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UploadFile() {
	const [file, setFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	async function uploadFileHandler(e) {
		const url = "http://localhost:8000/api/upload";
		e.preventDefault();
		const formData = new FormData();
		formData.append("demo", file);

		setIsLoading(true);
		try {
			const res = await axios.postForm(url, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setIsLoading(false);
			if (res.data) {
				alert("File uploaded successfully!");
			}
		} catch (error) {
			setError(error);
		}
	}

	function fileChangeHandler(event) {
		setFile(event.target.files[0]);
	}

	if (isLoading) {
		return (
			<div className="containter mx-auto">
				<p>Loading...</p>
			</div>
		);
	}
	if (error) {
		return <p>{error}</p>;
	}

	return (
		<section className="container mx-auto p-8">
			<div className="text-sm breadcrumbs mb-5">
				<ul>
					<li>
						<Link to="/home">Home</Link>
					</li>
					<li>Upload</li>
				</ul>
			</div>
			<h3 className="mb-5 font-medium uppercase">Upload your file</h3>
			<form onSubmit={uploadFileHandler}>
				<div className="form-control">
					<input
						type="file"
						name="demo"
						onChange={fileChangeHandler}
						className="file-input file-input-bordered file-input-accent w-full max-w-xs"
					/>
				</div>

				<button type="submit" className="btn btn-info btn-sm mt-5">
					Save
				</button>
			</form>
		</section>
	);
}

export default UploadFile;
