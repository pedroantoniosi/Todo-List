import React from "react";

interface SearchbarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Searchbar({ value, onChange }: SearchbarProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="bg-zinc-200 w-full p-2 rounded-full outline-none"
        placeholder="Buscar Tarefas"
      />
    </div>
  );
}
