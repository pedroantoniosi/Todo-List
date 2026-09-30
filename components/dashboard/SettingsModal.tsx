"use client";

import { useEffect } from "react";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsModal({ open, onClose }: SettingsModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Impede o scroll da página enquanto o modal estiver aberto
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#172554]/30 backdrop-blur-[2px] sm:items-center sm:p-4"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        className="
          w-full
          max-h-[92vh]
          overflow-y-auto
          rounded-t-3xl
          bg-white
          shadow-2xl
          sm:max-w-lg
          sm:rounded-3xl
        "
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
          <h2
            id="settings-title"
            className="text-lg font-semibold text-[#172554]"
          >
            Configurações
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar configurações"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              text-xl
              text-gray-400
              transition
              hover:bg-gray-100
              hover:text-gray-700
            "
          >
            ×
          </button>
        </header>

        <main className="px-4 py-5">
          {/* Informações da conta */}
          <SettingsSection title="Informações da conta">
            <div className="space-y-4">
              <SettingsInput label="Nome" value="Pedro Antonio" icon="♙" />

              <SettingsInput label="Email" value="pedro@email.com" icon="✉" />

              <SettingsInput
                label="Senha"
                value="••••••••••"
                type="password"
                icon="▣"
                action
              />

              <SettingsInput
                label="Confirmar senha"
                value="••••••••••"
                type="password"
                icon="▣"
                action
              />

              <button
                type="button"
                className="
                  flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-[#4F46E5]
                  text-sm
                  font-medium
                  text-white
                  shadow-sm
                  transition
                  hover:bg-[#4338CA]
                  active:scale-[0.99]
                "
              >
                <span>♙</span>
                Salvar alterações
              </button>
            </div>
          </SettingsSection>

          {/* Outras configurações */}
          <SettingsSection title="Outras configurações">
            <SettingsOption icon="☾" title="Tema" onClick={() => {}} />

            <SettingsOption
              icon="⊕"
              title="Idioma"
              value="Português"
              onClick={() => {}}
            />
          </SettingsSection>
        </main>
      </div>
    </div>
  );
}

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <h3 className="mb-2 px-1 text-sm font-semibold text-[#172554]">
        {title}
      </h3>

      <div className="overflow-hidden rounded-2xl border border-[#E8EBF5] bg-white shadow-[0_2px_12px_rgba(23,37,84,0.04)]">
        {children}
      </div>
    </section>
  );
}

function SettingsInput({
  label,
  value,
  icon,
  type = "text",
  action = false,
}: {
  label: string;
  value: string;
  icon: string;
  type?: string;
  action?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-[#172554]">
        {label}
      </label>

      <div className="relative flex h-10 items-center rounded-lg border border-[#DDE3F1] bg-[#F5F7FC]">
        <span className="ml-3 w-6 text-center text-[#7180A8]">{icon}</span>

        <input
          type={type}
          defaultValue={value}
          className="
            h-full
            min-w-0
            flex-1
            bg-transparent
            px-2
            text-sm
            text-[#172554]
            outline-none
          "
        />

        {action && (
          <button
            type="button"
            aria-label="Mostrar senha"
            className="mr-3 text-[#7180A8] hover:text-[#4F46E5]"
          >
            ◉
          </button>
        )}
      </div>
    </div>
  );
}

function SettingsOption({
  icon,
  title,
  value,
  onClick,
}: {
  icon: string;
  title: string;
  value?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        h-14
        w-full
        items-center
        border-b
        border-gray-100
        px-4
        text-left
        last:border-0
        hover:bg-gray-50
      "
    >
      <span className="w-8 text-lg text-[#172554]">{icon}</span>

      <span className="flex-1 text-sm text-[#172554]">{title}</span>

      {value && <span className="mr-2 text-xs text-gray-400">{value}</span>}

      <span className="text-lg text-gray-300">›</span>
    </button>
  );
}
