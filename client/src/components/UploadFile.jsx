import { useState } from "react";
import axios from "axios";

function UploadFile() {
	const [file, setFile] = useState(null);

	async function uploadFileHandler(e) {
		const url = "http://localhost:8000/api/upload";
		e.preventDefault();
		const formData = new FormData();

		formData.append("demo", file);

		const res = await axios.postForm(url, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		console.log(res);
	}

	function fileChangeHandler(event) {
		setFile(event.target.files[0]);
	}
	return (
		<section className="container mx-auto p-8">
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
