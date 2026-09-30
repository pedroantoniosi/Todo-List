"use client";

import { useState } from "react";
import { Trash2, X } from "lucide-react";

interface TaskData {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface EditTaskModalProps {
  taskId: string;
  title: string;
  description: string;
  onClose: () => void;
  onTaskUpdated: (task: TaskData) => void;
  onTaskDeleted: (taskId: string) => void;
}

export default function EditTaskModal({
  taskId,
  title: initialTitle,
  description: initialDescription,
  onClose,
  onTaskUpdated,
  onTaskDeleted,
}: EditTaskModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const [error, setError] = useState("");

  const isBusy = isSubmitting || isDeleting;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Informe o título da tarefa.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Usuário não autenticado.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao atualizar tarefa.");
      }

      onTaskUpdated(data);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar a tarefa.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Tem certeza que deseja remover esta tarefa?",
    );

    if (!confirmed) {
      return;
    }

    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Usuário não autenticado.");
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        let message = "Erro ao remover tarefa.";

        try {
          const data = await response.json();

          message = data.message || message;
        } catch {
          // A API pode retornar 204 sem corpo.
        }

        throw new Error(message);
      }

      onTaskDeleted(taskId);
      onClose();
    } catch (error) {
      console.error("Erro ao remover tarefa:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível remover a tarefa.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black">Editar Tarefa</h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isBusy}
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-black disabled:opacity-50"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="edit-task-title"
              className="mb-1 block text-sm font-medium text-zinc-700"
            >
              Título
            </label>

            <input
              id="edit-task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={isBusy}
              className="w-full rounded-lg border border-zinc-300 p-3 outline-none focus:border-blue-500 disabled:bg-zinc-100"
            />
          </div>

          <div>
            <label
              htmlFor="edit-task-description"
              className="mb-1 block text-sm font-medium text-zinc-700"
            >
              Descrição
            </label>

            <textarea
              id="edit-task-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              disabled={isBusy}
              className="min-h-32 w-full resize-none rounded-lg border border-zinc-300 p-3 outline-none focus:border-blue-500 disabled:bg-zinc-100"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isBusy}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 size={18} />

              {isDeleting ? "Removendo..." : "Remover tarefa"}
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isBusy}
                className="rounded-lg px-4 py-2 text-zinc-600 transition hover:bg-zinc-100 disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isBusy}
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Salvando..." : "Salvar alterações"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
