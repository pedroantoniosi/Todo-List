const benefits = [
  {
    id: 1,
    icon: "✓",
    title: "Mais produtividade",
    description:
      "Tenha uma visão clara do que precisa ser feito e mantenha o foco nas tarefas mais importantes.",
  },
  {
    id: 2,
    icon: "◷",
    title: "Organização simples",
    description:
      "Crie, organize e acompanhe suas tarefas sem complicações ou interfaces confusas.",
  },
  {
    id: 3,
    icon: "↗",
    title: "Acompanhe seu progresso",
    description:
      "Visualize suas tarefas concluídas e acompanhe sua evolução ao longo do tempo.",
  },
];

export default function Benefits() {
  return (
    <section className="bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Visual */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -left-6 top-10 h-20 w-20 rounded-full bg-purple-200/50 blur-xl" />
            <div className="absolute -right-6 bottom-10 h-24 w-24 rounded-full bg-fuchsia-200/50 blur-xl" />

            <div className="relative rounded-[40px] border border-purple-100 bg-gradient-to-br from-purple-50 to-fuchsia-50 p-8">
              <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Segunda-feira</p>
                    <h3 className="mt-1 text-xl font-bold text-gray-900">
                      Meu dia
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                    +
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl bg-purple-50 p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-xs text-white">
                        ✓
                      </span>

                      <span className="text-sm font-medium text-gray-500 line-through">
                        Planejar semana
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="h-6 w-6 rounded-full border-2 border-purple-300" />

                      <span className="text-sm font-semibold text-gray-800">
                        Criar novo projeto
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="h-6 w-6 rounded-full border-2 border-purple-300" />

                      <span className="text-sm font-semibold text-gray-800">
                        Estudar 1 hora
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-gradient-to-r from-purple-700 to-fuchsia-600 p-5 text-white">
                  <p className="text-xs text-purple-200">Tarefas concluídas</p>

                  <div className="mt-1 flex items-end justify-between">
                    <span className="text-3xl font-bold">12</span>

                    <span className="text-sm">esta semana</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-purple-600">
              Por que usar?
            </span>

            <h2 className="mt-3 text-4xl font-bold leading-tight text-gray-950 sm:text-5xl">
              Tudo o que você precisa para
              <span className="text-purple-700">
                {" "}
                manter sua rotina organizada.
              </span>
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-gray-500">
              Uma ferramenta criada para deixar sua rotina mais simples,
              permitindo que você concentre sua energia no que realmente precisa
              ser feito.
            </p>

            <div className="mt-9 space-y-7">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-lg font-bold text-purple-700">
                    {benefit.icon}
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">{benefit.title}</h3>

                    <p className="mt-1 max-w-lg text-sm leading-6 text-gray-500">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
