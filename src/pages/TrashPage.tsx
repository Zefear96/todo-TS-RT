import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { fetchTodos, getDeletedTodos } from "../features/todoSlice";
import { RootState } from "../app/store";

// MUI
import { styled } from "@mui/material/styles";

const Div = styled("div")(({ theme }) => ({
	...theme.typography.button,
	backgroundColor: theme.palette.background.paper,
	padding: theme.spacing(1),
}));

const TrashPage: React.FC = () => {
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
		<div>
			<ul className="todo-list">
				{todos.map((todo) => (
					<li key={todo.id}>
						<Div>
							<span className="text-todo-delete">{todo.text}</span>
							{/* <Button
								variant="outlined"
								onClick={() => dispatch(deleteTodo(todo))}
								color="error"
								className="btn-del-todo"
							>
								<DeleteIcon />
							</Button> */}
						</Div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TrashPage;
