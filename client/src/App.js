import React from "react";
import { Routes, Route } from "react-router-dom";

import Film from "./Components/Film/Film";
import Director from "./Components/Director/Director";
import SideBar from "./Components/SideBar/Sidebar";

import "./App.css";

function App() {
	return (
		<Routes>
			<Route path='/' exact element={<SideBar />}>
				<Route path='/film' exact element={<Film />} />
				<Route path='/director' element={<Director />} />
			</Route>
		</Routes>
	);
}

export default App;
