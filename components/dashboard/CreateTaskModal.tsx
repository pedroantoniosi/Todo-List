"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface TaskData {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface CreateTaskModalProps {
  onClose: () => void;
  onTaskCreated: (task: TaskData) => void;
}

export default function CreateTaskModal({
  onClose,
  onTaskCreated,
}: CreateTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao criar tarefa.");
      }

      onTaskCreated(data);
      onClose();
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível criar a tarefa.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black">Nova Tarefa</h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-black disabled:opacity-50"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="task-title"
              className="mb-1 block text-sm font-medium text-zinc-700"
            >
              Título
            </label>

            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-lg border border-zinc-300 p-3 outline-none focus:border-blue-500 disabled:bg-zinc-100"
              placeholder="Digite o título"
            />
          </div>

          <div>
            <label
              htmlFor="task-description"
              className="mb-1 block text-sm font-medium text-zinc-700"
            >
              Descrição
            </label>

            <textarea
              id="task-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              disabled={isSubmitting}
              className="min-h-32 w-full resize-none rounded-lg border border-zinc-300 p-3 outline-none focus:border-blue-500 disabled:bg-zinc-100"
              placeholder="Digite a descrição"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg px-4 py-2 text-zinc-600 transition hover:bg-zinc-100 disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Criando..." : "Criar tarefa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
