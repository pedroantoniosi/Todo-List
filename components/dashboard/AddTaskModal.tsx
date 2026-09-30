"use client";

import { FormEvent, useEffect, useState } from "react";

export interface NewTaskData {
  title: string;
  description: string;
  dueDate: string;
}

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: NewTaskData) => Promise<void>;
}

export default function AddTaskModal({
  open,
  onClose,
  onSubmit,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setTitle("");
      setDescription("");
      setDueDate("");
      setLoading(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) return;

    try {
      setLoading(true);

      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        dueDate,
      });

      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-end
        justify-center
        bg-black/30
        sm:items-center
        sm:p-5
      "
      onMouseDown={onClose}
    >
      <div
        className="
          w-full
          max-w-md
          rounded-t-[28px]
          bg-white
          p-5
          shadow-2xl
          sm:rounded-[28px]
        "
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Mobile handle */}
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-gray-200 sm:hidden" />

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Nova tarefa</h2>

            <p className="mt-1 text-xs text-gray-400">
              Adicione uma nova tarefa
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-gray-100
              text-gray-500
              transition
              hover:bg-gray-200
            "
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label
              htmlFor="task-title"
              className="mb-2 block text-xs font-semibold text-gray-600"
            >
              Título
            </label>

            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ex: Estudar TypeScript"
              maxLength={100}
              required
              autoFocus
              className="
                h-11
                w-full
                rounded-xl
                border
                border-gray-200
                bg-white
                px-3
                text-sm
                text-gray-900
                outline-none
                transition
                placeholder:text-gray-300
                focus:border-[#6257E8]
                focus:ring-2
                focus:ring-[#6257E8]/10
              "
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="task-description"
              className="mb-2 block text-xs font-semibold text-gray-600"
            >
              Descrição
              <span className="ml-1 font-normal text-gray-400">(opcional)</span>
            </label>

            <textarea
              id="task-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Descreva sua tarefa..."
              maxLength={500}
              rows={3}
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-gray-200
                px-3
                py-3
                text-sm
                text-gray-900
                outline-none
                transition
                placeholder:text-gray-300
                focus:border-[#6257E8]
                focus:ring-2
                focus:ring-[#6257E8]/10
              "
            />
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="task-date"
              className="mb-2 block text-xs font-semibold text-gray-600"
            >
              Data
              <span className="ml-1 font-normal text-gray-400">(opcional)</span>
            </label>

            <input
              id="task-date"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="
                h-11
                w-full
                rounded-xl
                border
                border-gray-200
                px-3
                text-sm
                text-gray-700
                outline-none
                focus:border-[#6257E8]
                focus:ring-2
                focus:ring-[#6257E8]/10
              "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !title.trim()}
            className="
              mt-2
              h-12
              w-full
              rounded-2xl
              bg-[#6257E8]
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#5147D4]
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading ? "Adicionando..." : "Adicionar tarefa"}
          </button>
        </form>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
