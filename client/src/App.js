import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Film from "./Components/Film/Film";
import SideBar from "./Components/SideBar/Sidebar";

import "./App.css";

function App() {
	return (
		<>
			<SideBar />
			<Routes>
				<Route path='/film' exact element={<Film />} />
			</Routes>
		</>
	);
}

export default App;
