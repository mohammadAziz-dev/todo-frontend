import type { Todo, TodoStatus } from "../types/Todo.ts";
import TodoItem from "./TodoItem.tsx";

type KanbanColumnProps = {
  title: string;
  todos: Todo[];
  onUpdateTodo: (todo: Todo) => Promise<void>;
  onDeleteTodo: (id: string) => Promise<void>;
  status: TodoStatus;
};

export default function KanbanColumn({
  title,
  todos,
  onUpdateTodo,
  onDeleteTodo,
  status,
}: KanbanColumnProps) {
  return (
    <section className="kanban-column" data-status={status}>
      <header className="kanban-column__header">
        <h2>{title}</h2>
        <span aria-label={`${todos.length} todos`}>{todos.length}</span>
      </header>

      {todos.length === 0 ? (
        <p className="kanban-column__empty">No todos in this column.</p>
      ) : (
        <ul className="kanban-column__list" aria-label={`${title} todos`}>
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
