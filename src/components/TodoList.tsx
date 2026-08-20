import type { Todo } from "../types/Todo.ts";
import TodoItem from "./TodoItem.tsx";

type TodoListProps = {
  todos: Todo[];
  onUpdateTodo: (todo: Todo) => Promise<void>;
  onDeleteTodo: (id: string) => Promise<void>;
};

export default function TodoList({
  todos,
  onUpdateTodo,
  onDeleteTodo,
}: TodoListProps) {
  if (todos.length === 0) {
    return <p>No todos available.</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}
