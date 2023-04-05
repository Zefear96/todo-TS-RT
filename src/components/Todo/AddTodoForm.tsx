import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { addTodo } from "../../features/todoSlice";
import { RootState } from "../../app/store";

const AddTodoForm: React.FC = () => {
	const dispatch: ThunkDispatch<RootState, undefined, AnyAction> =
		useDispatch();

	const [text, setText] = useState("");

	const todos = useSelector((state: RootState) => state.todo.todos);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (text.trim()) {
			dispatch(addTodo(text));
			setText("");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button type="submit">Add Todo</button>
		</form>
	);
};

export default AddTodoForm;
