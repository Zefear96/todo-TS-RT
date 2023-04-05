import axios from "axios";
import { Todo } from "./types";

const BASE_URL = "http://localhost:8000";

export const getTodos = async () => {
	const response = await axios.get<Todo>(`${BASE_URL}/todos`);
	return response.data;
};

export const createTodo = async (title: string) => {
	const response = await axios.post<Todo>(`${BASE_URL}/todos`, {
		title,
		completed: false,
	});
	return response.data;
};

export const updateTodo = async (id: number, data: Partial<Todo>) => {
	const response = await axios.patch<Todo>(`${BASE_URL}/todos/${id}`, data);
	return response.data;
};

export const deleteTodo = async (id: number) => {
	const response = await axios.delete(`${BASE_URL}/todos/${id}`);
	return response.data;
};
