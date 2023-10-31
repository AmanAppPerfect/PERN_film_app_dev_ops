import React from "react";
import { Routes, Route } from "react-router-dom";

import Film from "./Components/Film/Film";
import Director from "./Components/Director/Director";
import SideBar from "./Components/SideBar/Sidebar";
import myContext from "./Context";

import "./App.css";

const filmTableColumns = [
	{
		accessorKey: "film_id",
		header: "Film ID",
		size: 60,
		enableEditing: false,
	},
	{
		accessorKey: "title",
		header: "Title",
		size: 140,
	},
	{
		accessorKey: "film_description",
		header: "Description",
		size: 140,
		enableResizing: true,
	},
	{
		accessorKey: "director_id",
		header: "Directed By",
		size: 140,
	},
];

const directorTableColumns = [
	{
		accessorKey: "director_id",
		header: "Director ID",
		size: 60,
		enableEditing: false,
	},
	{
		accessorKey: "director_name",
		header: "Director Name",
		size: 140,
	},
];

function App() {
	return (
		<myContext.Provider
			value={{
				filmColumns: filmTableColumns,
				directorColumns: directorTableColumns,
			}}>
			<Routes>
				<Route path='/' exact element={<SideBar />}>
					<Route path='/film' exact element={<Film />} />
					<Route path='/director' element={<Director />} />
				</Route>
			</Routes>
		</myContext.Provider>
	);
}

export default App;
