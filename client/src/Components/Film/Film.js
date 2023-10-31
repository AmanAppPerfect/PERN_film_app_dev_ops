import React, { useEffect, useMemo, useState, useContext } from "react";

import { MaterialReactTable } from "material-react-table";

import { Box, Button, IconButton, Tooltip } from "@mui/material";

import { Delete, Edit } from "@mui/icons-material";

import AddFilmModal from "./AddFilmModal";

import myContext from "../../Context";

function Film() {
	const { filmColumns } = useContext(myContext);
	const [filmsData, setFilmsData] = useState([]);
	const [addFilmModalStatus, setAddFilmModalStatus] = useState(false);

	const handleSaveRowEdits = async ({ exitEditingMode, values }) => {
		values.film_id = parseInt(values.film_id);
		values.director_id = parseInt(values.director_id);
		console.log(values);

		try {
			const editRowResponse = await fetch(
				"http://localhost:5000/film/edit",
				{
					method: "put",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(values),
				}
			);
			console.log(editRowResponse);
		} catch (er6) {
			console.error(er6);
		}
		exitEditingMode(); //required to exit editing mode and close modal
	};

	const handleDeleteRow = async (row) => {
		if (
			window.confirm(
				`Are you sure you want to delete Film ${row.getValue(
					"title"
				)}`
			)
		) {
			console.log(row.original);
			try {
				const response = await fetch(
					`http://localhost:5000/film/${row.getValue(
						"film_id"
					)}`,
					{
						method: "DELETE",
					}
				);
				console.log(response);
			} catch (er5) {
				console.error(er5);
			}
		}

		//send api delete request here, then refetch or update local table data for re-render
	};

	useEffect(() => {
		async function getFilms() {
			const response = await fetch("http://localhost:5000");
			const films = await response.json();
			setFilmsData(films);
		}
		getFilms();
	}, [addFilmModalStatus, handleSaveRowEdits, handleDeleteRow]);

	const columns = useMemo(() => filmColumns, []);

	return (
		<div className='App'>
			<MaterialReactTable
				displayColumnDefOptions={{
					"mrt-row-actions": {
						muiTableHeadCellProps: {
							align: "center",
						},
						size: 120,
					},
				}}
				columns={columns}
				data={filmsData}
				editingMode='modal' //default
				enableColumnOrdering
				enableEditing
				state={{ columnVisibility: { film_id: false } }}
				onEditingRowSave={handleSaveRowEdits}
				// onEditingRowCancel={handle}
				renderRowActions={({ row, table }) => (
					<Box sx={{ display: "flex", gap: "1rem" }}>
						<Tooltip arrow placement='left' title='Edit'>
							<IconButton
								onClick={() => {
									table.setEditingRow(row);
								}}>
								<Edit />
							</IconButton>
						</Tooltip>
						<Tooltip arrow placement='right' title='Delete'>
							<IconButton
								color='error'
								onClick={() => handleDeleteRow(row)}>
								<Delete />
							</IconButton>
						</Tooltip>
					</Box>
				)}
				renderTopToolbarCustomActions={() => (
					<Button
						color='secondary'
						onClick={() => setAddFilmModalStatus(true)}
						variant='contained'>
						Add Film
					</Button>
				)}
			/>
			<AddFilmModal
				columns={columns}
				state={{ columnVisibility: { film_id: false } }}
				open={addFilmModalStatus}
				onclose={() => setAddFilmModalStatus(false)}
			/>
		</div>
	);
}

export default Film;
