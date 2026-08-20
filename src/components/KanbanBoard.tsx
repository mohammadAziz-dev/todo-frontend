import type { Todo, TodoStatus } from "../types/Todo.ts";
import KanbanColumn from "./KanbanColumn.tsx";

type KanbanBoardProps = {
  todos: Todo[];
  onUpdateTodo: (todo: Todo) => Promise<void>;
  onDeleteTodo: (id: string) => Promise<void>;
};

const columns: { title: string; status: TodoStatus }[] = [
  { title: "Open", status: "OPEN" },
  { title: "In progress", status: "IN_PROGRESS" },
  { title: "Done", status: "DONE" },
];

export default function KanbanBoard({
  todos,
  onUpdateTodo,
  onDeleteTodo,
}: KanbanBoardProps) {
  return (
    <div className="kanban-board">
      {columns.map((column) => (
        <KanbanColumn
          key={column.status}
          title={column.title}
          status={column.status}
          todos={todos.filter((todo) => todo.status === column.status)}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </div>
  );
}
