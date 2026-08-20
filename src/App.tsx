import { useEffect, useState } from "react";
import TodoList from "./components/TodoList.tsx";
import TodoForm from "./components/TodoForm.tsx";
import { createTodo, getTodos, updateTodo } from "./api/todoApi.ts";
import type { Todo } from "./types/Todo.ts";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadTodos() {
      try {
        const loadedTodos = await getTodos(controller.signal);
        setTodos(loadedTodos);
      } catch (error: unknown) {
        if (!controller.signal.aborted) {
          console.error("Failed to load todos:", error);
          setError("Todos could not be loaded.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadTodos();

    return () => {
      controller.abort();
    };
  }, []);

  async function handleAddTodo(description: string) {
    const createdTodo = await createTodo({
      description,
      status: "OPEN",
    });

    setTodos((currentTodos) => [...currentTodos, createdTodo]);
  }

  async function handleUpdateTodo(todo: Todo) {
    const updatedTodo = await updateTodo(todo);

    setTodos((currentTodos) =>
      currentTodos.map((currentTodo) =>
        currentTodo.id === updatedTodo.id ? updatedTodo : currentTodo,
      ),
    );
  }

  return (
    <main>
      <h1>Todo App</h1>
      <TodoForm onAddTodo={handleAddTodo} />

      {isLoading && <p>Loading todos...</p>}
      {error && <p role="alert">{error}</p>}
      {!isLoading && !error && (
        <TodoList todos={todos} onUpdateTodo={handleUpdateTodo} />
      )}
    </main>
  );
}

export default App;
