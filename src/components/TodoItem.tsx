import type { Todo, TodoStatus } from "../types/Todo.ts";

type TodoItemProps = {
  todo: Todo;
};

const statusLabels: Record<TodoStatus, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In progress",
  DONE: "Done",
};

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <li>
      <p>{todo.description}</p>
      <span>{statusLabels[todo.status]}</span>
    </li>
  );
}
