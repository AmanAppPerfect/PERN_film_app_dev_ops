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

function AddDirectorModal({ columns, open, onclose }) {
	const [values, setValues] = useState({
		director_id: 0,
		director_name: "",
	});

	async function addNewDirectorHandler() {
		console.log(values);

		if (values.director_name) {
			try {
				const addDirectorResponse = await fetch(
					"http://localhost:5000/addDirector",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(values),
					}
				);
				console.log(addDirectorResponse);
			} catch (er7) {
				console.error(er7);
			}
		}
		onclose();
	}

	return (
		<Dialog open={open}>
			<DialogTitle textAlign='center'>Add New Director</DialogTitle>
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
								!(
									column.accessorKey == "director_id"
								) && (
									<TextField
										type='text'
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
					onClick={addNewDirectorHandler}
					color='secondary'
					variant='contained'>
					Add Director
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AddDirectorModal;
