"use client";

import { useRouter } from "next/navigation";
import { ListTodo, SlidersHorizontal, Settings, LogOut } from "lucide-react";

import NavButton from "./ui/NavButton";

interface NavbarProps {
  onOpenFilters: () => void;
  onOpenSettings: () => void;
}

export default function Navbar({ onOpenFilters, onOpenSettings }: NavbarProps) {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");

    router.push("/login");
  }

  return (
    <div className="min-w-[320px] bg-white px-4 py-24">
      <ul className="flex justify-evenly gap-2 md:flex-col md:gap-4">
        <li>
          <NavButton label="Tarefas" icon={ListTodo} />
        </li>

        <li>
          <NavButton
            label="Filtros"
            icon={SlidersHorizontal}
            onClick={onOpenFilters}
          />
        </li>

        <li>
          <NavButton
            label="Configurações"
            icon={Settings}
            onClick={onOpenSettings}
          />
        </li>

        <li>
          <NavButton
            label="Sair"
            icon={LogOut}
            onClick={handleLogout}
            variant="danger"
          />
        </li>
      </ul>
    </div>
  );
}
