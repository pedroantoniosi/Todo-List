import { LucideIcon } from "lucide-react";

interface NavButtonProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  variant?: "default" | "danger";
}

export default function NavButton({
  label,
  icon: Icon,
  onClick,
}: NavButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={` flex flex-col  justify-center items-center gap-2 md:flex-row md:gap-4 font-semibold transition cursor-pointer md:hover:bg-zinc-200 md:p-2 md:rounded-md
      `}
    >
      <Icon size={20} />

      <span>{label}</span>
    </button>
  );
}
