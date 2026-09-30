import Container from "../ui/Container";
import Button from "./ui/Button";

interface HeaderProps {
  totalTasks: number;
  onCreateTask: () => void;
  onOpenFilters: () => void;
  hasActiveFilters: boolean;
}

export default function Header({
  totalTasks,
  onCreateTask,
  onOpenFilters,
  hasActiveFilters,
}: HeaderProps) {
  return (
    <div>
      <Container className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-black">Minhas Tarefas</h2>

          <span>
            {totalTasks} {totalTasks === 1 ? "tarefa" : "tarefas"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="primary" onClick={onCreateTask}>
            <div className="flex gap-2">
              <span>+</span>

              <span className="hidden md:block">Nova Tarefa</span>
            </div>
          </Button>

          <button
            type="button"
            onClick={onOpenFilters}
            className={`rounded-full p-2 transition ${
              hasActiveFilters
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-zinc-100 text-black hover:bg-zinc-200"
            }`}
          >
            filtros
          </button>
        </div>
      </Container>
    </div>
  );
}
