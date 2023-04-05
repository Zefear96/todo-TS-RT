import React from "react";
import { Route, Routes } from "react-router-dom";
import TodoList from "./components/Todo/TodoList";
import AddTodoForm from "./components/Todo/AddTodoForm";

export const MainRoutes: React.FC = () => {
	return (
		<Routes>
			{/* <Route path="/add" element={<AddTodoForm />} /> */}
			<Route path="/list" element={<TodoList />} />
		</Routes>
	);
};

export default MainRoutes;
