"use client";

interface SettingsProps {
  onBack: () => void;
}

export default function Settings({ onBack }: SettingsProps) {
  return (
    <section className="min-h-screen bg-white pb-20">
      <header className="border-b border-gray-100">
        <div className="mx-auto flex h-[72px] max-w-md items-center px-5">
          <button
            onClick={onBack}
            aria-label="Voltar"
            className="
              mr-3
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              text-[#6257E8]
              hover:bg-[#6257E8]/10
            "
          >
            ←
          </button>

          <h1 className="text-lg font-semibold text-gray-900">Configurações</h1>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 pt-6">
        <SettingsGroup title="Conta">
          <SettingsItem
            title="Perfil"
            description="Nome e informações pessoais"
          />

          <SettingsItem
            title="Segurança"
            description="Senha e segurança da conta"
          />
        </SettingsGroup>

        <SettingsGroup title="Aplicação">
          <SettingsItem
            title="Notificações"
            description="Gerencie suas notificações"
          />

          <SettingsItem title="Aparência" description="Tema da aplicação" />

          <SettingsItem title="Idioma" description="Português (Brasil)" />
        </SettingsGroup>

        <SettingsGroup title="Dados">
          <SettingsItem
            title="Tarefas concluídas"
            description="Gerencie suas tarefas"
          />

          <SettingsItem
            title="Excluir conta"
            description="Excluir permanentemente sua conta"
            danger
          />
        </SettingsGroup>

        <SettingsGroup title="Sobre">
          <SettingsItem title="Termos de uso" />

          <SettingsItem title="Política de privacidade" />

          <div className="px-4 py-3 text-xs text-gray-400">Versão 1.0.0</div>
        </SettingsGroup>
      </main>
    </section>
  );
}

function SettingsGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-7">
      <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
        {title}
      </h2>

      <div className="overflow-hidden rounded-2xl border border-gray-100">
        {children}
      </div>
    </section>
  );
}

function SettingsItem({
  title,
  description,
  danger = false,
}: {
  title: string;
  description?: string;
  danger?: boolean;
}) {
  return (
    <button className="flex w-full items-center border-b border-gray-100 p-4 text-left last:border-0 hover:bg-gray-50">
      <div className="flex-1">
        <p
          className={`text-sm font-medium ${
            danger ? "text-red-500" : "text-gray-800"
          }`}
        >
          {title}
        </p>

        {description && (
          <p className="mt-1 text-xs text-gray-400">{description}</p>
        )}
      </div>

      <span className="text-gray-300">→</span>
    </button>
  );
}
