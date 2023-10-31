import React, { useContext, useEffect, useMemo, useState } from "react";

import { MaterialReactTable } from "material-react-table";

import { Box, Button, IconButton, Tooltip } from "@mui/material";

import { Delete, Edit } from "@mui/icons-material";

import AddDirectorModal from "./AddDirectorModal";

import myContext from "../../Context";

function Director() {
	const { directorColumns } = useContext(myContext);
	const [directorsData, setDirectorsData] = useState([]);
	const [addDirectorModalStatus, setAddDirectorModalStatus] =
		useState(false);

	const handleSaveRowEdits = async ({ exitEditingMode, values }) => {
		values.director_id = parseInt(values.director_id);
		console.log(values);

		try {
			const editRowResponse = await fetch(
				"http://localhost:5000/director/edit",
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
				`Are you sure you want to delete Director ${row.getValue(
					"Director Name"
				)}`
			)
		) {
			console.log(row.original);
			try {
				const response = await fetch(
					`http://localhost:5000/director/${row.getValue(
						"director_id"
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
		async function getDirectors() {
			const response = await fetch("http://localhost:5000/directors");
			const directors = await response.json();
			setDirectorsData(directors);
		}
		getDirectors();
	}, [addDirectorModalStatus, handleSaveRowEdits, handleDeleteRow]);

	const columns = useMemo(() => directorColumns, []);

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
				data={directorsData}
				editingMode='modal' //default
				enableColumnOrdering
				enableEditing
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
						onClick={() => setAddDirectorModalStatus(true)}
						variant='contained'>
						Add Director
					</Button>
				)}
			/>
			<AddDirectorModal
				columns={columns}
				state={{ columnVisibility: { director_id: false } }}
				open={addDirectorModalStatus}
				onclose={() => setAddDirectorModalStatus(false)}
			/>
		</div>
	);
}

export default Director;
