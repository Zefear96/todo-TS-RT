import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
	fetchTodos,
	deleteTodo,
	updateTodo,
	getOneTodo,
} from "../../features/todoSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import AddTodoForm from "./AddTodoForm";

import "./TodoList.css";

// MUI
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

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
					<li key={todo.id}>
						<Div className={`todo-item ${todo.completed ? "completed" : ""}`}>
							<Checkbox
								checked={todo.completed}
								className="inp-checkbox-todo"
								onChange={() =>
									dispatch(
										updateTodo({
											...todo,
											completed: !todo.completed,
										}),
									)
								}
							/>
							<span className="text-todo">{todo.text}</span>

							<Button
								variant="outlined"
								// onChange={() =>
								// 	dispatch(
								// 		getOneTodo({
								// 			...todo,
								// 			tetextxt: ,
								// 		}),
								// 	)
								// }
								className="btn-edit-todo"
							>
								<AutoFixHighIcon />
							</Button>

							<Button
								variant="outlined"
								onClick={() => dispatch(deleteTodo(todo))}
								color="error"
								className="btn-del-todo"
							>
								<DeleteIcon />
							</Button>
						</Div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
