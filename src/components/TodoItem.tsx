import { useState, type ChangeEvent } from "react";
import type { Todo, TodoStatus } from "../types/Todo.ts";

type TodoItemProps = {
  todo: Todo;
  onUpdateTodo: (todo: Todo) => Promise<void>;
  onDeleteTodo: (id: string) => Promise<void>;
};

const statusLabels: Record<TodoStatus, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In progress",
  DONE: "Done",
};

export default function TodoItem({
  todo,
  onUpdateTodo,
  onDeleteTodo,
}: TodoItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    const status = event.target.value as TodoStatus;

    if (status === todo.status) {
      return;
    }

    try {
      setIsUpdating(true);
      setError(null);

      await onUpdateTodo({
        ...todo,
        status,
      });
    } catch (error: unknown) {
      console.error("Failed to update todo:", error);
      setError("The todo could not be updated.");
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleDelete() {
    const shouldDelete = window.confirm(
      `Do you want to delete "${todo.description}"?`,
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);

      await onDeleteTodo(todo.id);
    } catch (error: unknown) {
      console.error("Failed to delete todo:", error);
      setError("The todo could not be deleted.");
      setIsDeleting(false);
    }
  }

  return (
    <li className="todo-card">
      <p className="todo-card__description">{todo.description}</p>

      <div className="todo-card__actions">
        <div className="todo-card__status">
          <label htmlFor={`todo-status-${todo.id}`}>Status</label>
          <select
            id={`todo-status-${todo.id}`}
            value={todo.status}
            onChange={handleStatusChange}
            disabled={isUpdating || isDeleting}
          >
            {Object.entries(statusLabels).map(([status, label]) => (
              <option key={status} value={status}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <button
          className="button-delete"
          type="button"
          onClick={handleDelete}
          disabled={isUpdating || isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      {isUpdating && (
        <p className="feedback" aria-live="polite">
          Updating...
        </p>
      )}

      {error && (
        <p className="feedback feedback--error" role="alert">
          {error}
        </p>
      )}
    </li>
  );
}
