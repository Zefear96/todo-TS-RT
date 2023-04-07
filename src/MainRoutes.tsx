import React from "react";
import { Route, Routes } from "react-router-dom";
import TodoList from "./components/Todo/TodoList";
import TrashPage from "./pages/TrashPage";

export const MainRoutes: React.FC = () => {
	return (
		<Routes>
			{/* <Route path="/add" element={<AddTodoForm />} /> */}
			<Route path="/list" element={<TodoList />} />
			<Route path="/trash" element={<TrashPage />} />
		</Routes>
	);
};

export default MainRoutes;
