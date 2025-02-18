import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Film from "./Components/Film/Film";
import Director from "./Components/Director/Director";
import SideBar from "./Components/SideBar/Sidebar";
import myContext from "./Context";

import HomePage from "./Views/HomePage";

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
	const data = JSON.parse(window.localStorage.getItem("userData"));
	const [userData, setUserData] = useState(data == null ? {} : data);

	useEffect(() => {
		window.localStorage.setItem("userData", JSON.stringify(userData));
	}, [userData]);

	return (
		<myContext.Provider
			value={{
				filmColumns: filmTableColumns,
				directorColumns: directorTableColumns,
				userData: userData,
				setUserData: setUserData,
				BASE_URL: process.env.REACT_APP_SERVER_BASE_URL,
			}}>
			<Routes>
				{console.log(userData)}
				<Route
					path='/'
					element={
						userData.type === "userData" ? (
							<SideBar />
						) : (
							<HomePage />
						)
					}>
					<Route path='/film' exact element={<Film />} />
					<Route path='/director' element={<Director />} />
				</Route>
			</Routes>
		</myContext.Provider>
	);
}

export default App;
