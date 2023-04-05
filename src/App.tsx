import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { MainRoutes } from "./MainRoutes";
import AddTodoForm from "./components/Todo/AddTodoForm";

function App() {
	return (
		<>
			<Navbar />
			<AddTodoForm />
			<MainRoutes />
		</>
	);
}

export default App;
