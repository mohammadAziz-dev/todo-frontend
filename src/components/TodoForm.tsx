import { useState, type SyntheticEvent } from "react";

type TodoFormProps = {
  onAddTodo: (description: string) => Promise<void>;
};

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedDescription = description.trim();

    if (!trimmedDescription) {
      setError("Please enter a todo description.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await onAddTodo(trimmedDescription);
      setDescription("");
    } catch (error: unknown) {
      console.error("Failed to add todo:", error);
      setError("The todo could not be added.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todo-description">New todo</label>

      <input
        id="todo-description"
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Enter a todo"
        disabled={isSubmitting}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add todo"}
      </button>

      {error && <p role="alert">{error}</p>}
    </form>
  );
}
