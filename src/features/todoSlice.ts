import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { strict } from "assert";
import axios from "axios";

const BASE_URL = "http://localhost:8000";

export interface Todo {
	id: number;
	text: string;
	completed: boolean;
}

interface TodoState {
	todos: Todo[];
	status: "idle" | "loading" | "failed";
	error: string | null;
	id: number;
}

const initialState: TodoState = {
	todos: [],
	status: "idle",
	error: null,
	id: Date.now(),
};

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
	const response = await axios.get<Todo[]>(`${BASE_URL}/todos`);
	return response.data;
});

export const getDeletedTodos = createAsyncThunk(
	"todos/getDeletedTodos",
	async () => {
		const response = await axios.get<Todo[]>(`${BASE_URL}/trash`);
		return response.data;
	},
);

export const addTodo = createAsyncThunk("todos/addTodo", async (text: any) => {
	const response = await axios.post<Todo>(`${BASE_URL}/todos`, {
		text,
		completed: false,
		id: Date.now(),
	});
	return response.data;
});

export const deleteTodo = createAsyncThunk(
	"todos/deleteTodo",
	async (todo: Todo) => {
		console.log(todo);
		const response = await axios.post<Todo>(`${BASE_URL}/trash`, {
			...todo,
		});
		await axios.delete(`${BASE_URL}/todos/${todo.id}`);
		return todo.id;
	},
);

export const deleteFromTrash = createAsyncThunk(
	"todos/deleteTodo",
	async (todo: Todo) => {
		await axios.delete(`${BASE_URL}/trash/${todo.id}`);
		return todo.id;
	},
);

export const updateTodo = createAsyncThunk(
	"todos/updateTodo",
	async (todo: Todo) => {
		const response = await axios.put<Todo>(
			`${BASE_URL}/todos/${todo.id}`,
			todo,
		);
		return response.data;
	},
);

export const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTodos.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getTodos.fulfilled, (state, action) => {
				state.status = "idle";
				state.todos = action.payload;
			})
			.addCase(getTodos.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || null;
			})
			.addCase(getDeletedTodos.fulfilled, (state, action) => {
				state.status = "idle";
				state.todos = action.payload;
			})
			.addCase(addTodo.fulfilled, (state, action) => {
				state.todos.push(action.payload);
			})
			.addCase(deleteTodo.fulfilled, (state, action) => {
				state.todos = state.todos.filter((todo) => todo.id !== action.payload);
			})
			.addCase(updateTodo.fulfilled, (state, action) => {
				const index = state.todos.findIndex(
					(todo) => todo.id === action.payload.id,
				);
				if (index !== -1) {
					state.todos[index] = action.payload;
				}
			});
	},
});

export default todoSlice.reducer;
