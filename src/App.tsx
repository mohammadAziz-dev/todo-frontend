import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm.tsx";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./api/todoApi.ts";
import type { Todo } from "./types/Todo.ts";
import KanbanBoard from "./components/KanbanBoard.tsx";
import "./App.css";

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

  async function handleDeleteTodo(id: string) {
    await deleteTodo(id);

    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  return (
    <main className="app">
      <header className="app-header">
        <p className="app-header__eyebrow">Personal task workspace</p>
        <h1>Todo Board</h1>
        <p className="app-header__description">
          Organize tasks and track their progress.
        </p>
      </header>

      <TodoForm onAddTodo={handleAddTodo} />

      {isLoading && <p className="feedback">Loading todos...</p>}
      {error && (
        <p className="feedback feedback--error" role="alert">
          {error}
        </p>
      )}

      {!isLoading && !error && (
        <KanbanBoard
          todos={todos}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      )}
    </main>
  );
}

export default App;
