import type { Todo } from "../types/Todo.ts";
import TodoItem from "./TodoItem.tsx";

type KanbanColumnProps = {
  title: string;
  todos: Todo[];
  onUpdateTodo: (todo: Todo) => Promise<void>;
  onDeleteTodo: (id: string) => Promise<void>;
};

export default function KanbanColumn({
  title,
  todos,
  onUpdateTodo,
  onDeleteTodo,
}: KanbanColumnProps) {
  return (
    <section>
      <h2>
        {title} ({todos.length})
      </h2>

      {todos.length === 0 ? (
        <p>No todos in this column.</p>
      ) : (
        <ul aria-label={`${title} todos`}>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdateTodo={onUpdateTodo}
              onDeleteTodo={onDeleteTodo}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
