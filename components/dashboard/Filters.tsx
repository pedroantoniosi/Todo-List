"use client";

import React, { useState } from "react";

interface FiltersProps {
  sortOrder: string;
  startDate: string;
  endDate: string;
  onApply: (sortOrder: string, startDate: string, endDate: string) => void;
  onClose: () => void;
}

export default function Filters({
  sortOrder,
  startDate,
  endDate,
  onApply,
  onClose,
}: FiltersProps) {
  const [tempSortOrder, setTempSortOrder] = useState(sortOrder);

  const [tempStartDate, setTempStartDate] = useState(startDate);

  const [tempEndDate, setTempEndDate] = useState(endDate);

  function handleApply() {
    onApply(tempSortOrder, tempStartDate, tempEndDate);

    onClose();
  }

  function handleClear() {
    setTempSortOrder("");
    setTempStartDate("");
    setTempEndDate("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black">Filtros</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-black"
            aria-label="Fechar filtros"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="sortOrder"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Ordenar por
            </label>

            <select
              id="sortOrder"
              value={tempSortOrder}
              onChange={(event) => setTempSortOrder(event.target.value)}
              className="w-full rounded-lg border border-zinc-300 bg-white p-3 outline-none focus:border-blue-500"
            >
              <option value="">Padrão</option>

              <option value="az">A → Z</option>

              <option value="za">Z → A</option>

              <option value="recent">Mais recentes</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="startDate"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Data inicial
            </label>

            <input
              id="startDate"
              type="date"
              value={tempStartDate}
              onChange={(event) => setTempStartDate(event.target.value)}
              className="w-full rounded-lg border border-zinc-300 p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Data final
            </label>

            <input
              id="endDate"
              type="date"
              value={tempEndDate}
              onChange={(event) => setTempEndDate(event.target.value)}
              className="w-full rounded-lg border border-zinc-300 p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleClear}
              className="rounded-lg px-4 py-2 text-zinc-600 transition hover:bg-zinc-100"
            >
              Limpar
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-zinc-600 transition hover:bg-zinc-100"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleApply}
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
