import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
	getTodos,
	deleteTodo,
	updateTodo,
	Todo,
} from "../../features/todoSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import AddTodoForm from "./AddTodoForm";
import TextField from "@mui/material/TextField";

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

	const [text, setText] = useState("");

	useEffect(() => {
		dispatch(getTodos());
	}, [dispatch]);

	const handleSubmit = (
		e: React.FormEvent<HTMLFormElement>,
		todoId: number,
	) => {
		e.preventDefault();
		dispatch(
			updateTodo({
				id: todoId,
				text,
				completed: false,
			}),
		);
		setText("");
	};

	const handleDelete = (todoId: any) => {
		dispatch(deleteTodo(todoId));
	};

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

							{/* <form
								onSubmit={(e) => handleSubmit(e, todo.id)}
								style={{ display: "none" }}
							>
								<TextField
									id="outlined-basic"
									variant="outlined"
									type="text"
									value={text}
									onChange={(e) => setText(e.target.value)}
									className="inp-add-todo"
									autoFocus
								/>
								<Button type="submit" variant="outlined">
									Update Todo
								</Button>
							</form> */}

							<div className="btns-todo-list">
								{/* <Button
									variant="outlined"
									onClick={() => handleEdit(todo)}
									className="btn-edit-todo "
								>
									<AutoFixHighIcon />
								</Button> */}
								<Button
									variant="outlined"
									onClick={() => handleDelete(todo)}
									className="btn-del-todo"
								>
									<DeleteIcon />
								</Button>
							</div>
						</Div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
