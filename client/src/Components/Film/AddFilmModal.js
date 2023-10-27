import React, { useState } from "react";

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	TextField,
} from "@mui/material";

function AddFilmModal({ columns, open, onclose }) {
	const [values, setValues] = useState({
		film_description: "",
		title: "",
		director_id: 0,
	});

	async function addNewFilmHandler() {
		console.log(values);

		if (values.title) {
			try {
				const addFilmResponse = await fetch(
					"http://localhost:5000/addFilm",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(values),
					}
				);
				console.log(addFilmResponse);
			} catch (er7) {
				console.error(er7);
			}
		}
		onclose();
	}

	return (
		<Dialog open={open}>
			<DialogTitle textAlign='center'>Add New Film</DialogTitle>
			<DialogContent>
				<form>
					<Stack
						sx={{
							width: "100%",
							minWidth: {
								xs: "300px",
								sm: "360px",
								md: "400px",
							},
							gap: "1.5rem",
						}}>
						{columns.map(
							(column) =>
								!(column.accessorKey == "film_id") && (
									<TextField
										type={
											column.accessorKey ==
											"director_id"
												? "number"
												: "text"
										}
										key={column.accessorKey}
										label={column.header}
										name={column.accessorKey}
										onChange={(e) =>
											setValues({
												...values,
												[e.target.name]:
													e.target.value,
											})
										}
										id={column.header}
									/>
								)
						)}
					</Stack>
				</form>
			</DialogContent>
			<DialogActions sx={{ p: "1.25rem" }}>
				<Button onClick={onclose}>Cancel</Button>
				<Button
					onClick={addNewFilmHandler}
					color='secondary'
					variant='contained'>
					Add Film
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AddFilmModal;
