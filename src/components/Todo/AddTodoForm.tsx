import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { addTodo } from "../../features/todoSlice";
import { RootState } from "../../app/store";

// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

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
		<form onSubmit={handleSubmit} className="add-form-todo">
			<TextField
				id="standard-basic"
				label="To do..."
				variant="standard"
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				className="inp-add-todo"
			/>
			<Button
				variant="contained"
				type="submit"
				id="btn-add-todo"
				startIcon={<AddCircleOutlineIcon />}
			>
				Add Todo
			</Button>
		</form>
	);
};

export default AddTodoForm;
