import axios from "axios";
import type { CreateTodo, Todo } from "../types/Todo.ts";

const TODO_API_URL = "/api/todo";

export async function getTodos(signal?: AbortSignal): Promise<Todo[]> {
  const response = await axios.get<Todo[]>(TODO_API_URL, { signal });

  return response.data;
}

export async function createTodo(todo: CreateTodo): Promise<Todo> {
  const response = await axios.post<Todo>(TODO_API_URL, todo);

  return response.data;
}

export async function updateTodo(todo: Todo): Promise<Todo> {
  const response = await axios.put<Todo>(`${TODO_API_URL}/${todo.id}`, todo);

  return response.data;
}
