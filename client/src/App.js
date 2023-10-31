import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Film from "./Components/Film/Film";
import Director from "./Components/Director/Director";
import SideBar from "./Components/SideBar/Sidebar";

import "./App.css";

function App() {
	return (
		<SideBar>
			<Routes>
				<Route path='/' exact element={<Film />} />
				<Route path='/film' exact element={<Film />} />
				<Route path='/director' element={<Director />} />
			</Routes>
		</SideBar>
	);
}

export default App;
