import axios from "axios";
import type { Todo } from "../types/Todo.ts";

const TODO_API_URL = "/api/todo";

export async function getTodos(signal?: AbortSignal): Promise<Todo[]> {
  const response = await axios.get<Todo[]>(TODO_API_URL, { signal });

  return response.data;
}
