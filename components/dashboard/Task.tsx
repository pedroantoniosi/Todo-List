import { LucideIcon } from "lucide-react";
import { MoreVertical } from "lucide-react";
interface TaskProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  onEdit: () => void;
  onToggleComplete: () => void;
}

export default function Task({
  title,
  description,
  completed,
  onEdit,
  onToggleComplete,
}: TaskProps) {
  return (
    <div className="flex max-w-150 flex-col gap-2 rounded-2xl border-2 border-zinc-300 bg-white p-4">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onToggleComplete}
          aria-label={
            completed
              ? "Marcar tarefa como pendente"
              : "Marcar tarefa como concluída"
          }
          className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition cursor-pointer ${
            completed
              ? "border-primary bg-primary text-white"
              : "border-zinc-400 bg-transparent text-transparent hover:border-primary"
          }`}
        >
          {completed && <span className="text-xs font-bold">✓</span>}
        </button>

        <div className="flex flex-1 flex-col gap-2">
          <h2>{title}</h2>

          <p className="text-zinc-700">{description}</p>
        </div>

        <div className="flex flex-col justify-between gap-2 0 items-end">
          <button
            type="button"
            onClick={onEdit}
            className="text-left text-black transition hover:text-primary"
          >
            <div className="cursor-pointer">
              <MoreVertical size={20} />
            </div>
          </button>

          <span
            className={
              completed
                ? "rounded-4xl bg-green-200 px-2 text-green-700"
                : "rounded-4xl bg-yellow-200 px-2 text-yellow-700"
            }
          >
            {completed ? "Concluído" : "Pendente"}
          </span>
        </div>
      </div>
    </div>
  );
}
