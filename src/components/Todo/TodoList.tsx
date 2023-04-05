import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { fetchTodos, deleteTodo, updateTodo } from "../../features/todoSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import AddTodoForm from "./AddTodoForm";

import "./TodoList.css";

// MUI
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

const Div = styled("div")(({ theme }) => ({
	...theme.typography.button,
	backgroundColor: theme.palette.background.paper,
	padding: theme.spacing(1),
}));

const TodoList: React.FC = () => {
	const dispatch: ThunkDispatch<RootState, undefined, AnyAction> =
		useDispatch();
	const { todos, status, error } = useSelector(
		(state: RootState) => state.todo,
	);

	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch]);

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (status === "failed") {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="todo-page">
			<AddTodoForm />
			<ul className="todo-list">
				{todos.map((todo) => (
					<li
						key={todo.id}
						className={`todo-item ${todo.completed ? "completed" : ""}`}
					>
						<Checkbox
							color="success"
							checked={todo.completed}
							onChange={() =>
								dispatch(
									updateTodo({
										...todo,
										completed: !todo.completed,
									}),
								)
							}
						/>

						<Div>{todo.text}</Div>

						<Button
							variant="contained"
							onClick={() => dispatch(deleteTodo(todo.id))}
							startIcon={<DeleteIcon />}
						></Button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
