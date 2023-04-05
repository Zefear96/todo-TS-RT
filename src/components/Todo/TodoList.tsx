import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { fetchTodos, deleteTodo, updateTodo } from "../../features/todoSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

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
		<ul>
			{todos.map((todo) => (
				<li key={todo.id}>
					<input
						type="checkbox"
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
					<span>{todo.text}</span>
					<button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
				</li>
			))}
		</ul>
	);
};

export default TodoList;
