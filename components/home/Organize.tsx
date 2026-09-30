const tasks = [
  {
    id: 1,
    title: "Definir objetivos da semana",
    category: "Planejamento",
    completed: true,
  },
  {
    id: 2,
    title: "Finalizar projeto pessoal",
    category: "Trabalho",
    completed: true,
  },
  {
    id: 3,
    title: "Estudar Next.js",
    category: "Estudos",
    completed: false,
  },
  {
    id: 4,
    title: "Organizar agenda de amanhã",
    category: "Pessoal",
    completed: false,
  },
];

export default function Organize() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-800 via-purple-700 to-fuchsia-700 px-6 py-24 lg:px-8">
      {/* Background decorations */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-fuchsia-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center text-white">
          <span className="text-sm font-semibold uppercase tracking-wider text-purple-200">
            Simples e eficiente
          </span>

          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Organize suas tarefas
            <span className="block text-purple-200">sem complicação.</span>
          </h2>

          <p className="mt-5 leading-7 text-purple-100">
            Transforme uma lista de tarefas em uma rotina organizada. Crie
            prioridades, acompanhe seu progresso e nunca mais esqueça o que
            precisa fazer.
          </p>
        </div>

        {/* Content */}
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Text */}
          <div className="text-white">
            <div className="space-y-7">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 font-bold">
                  01
                </div>

                <div>
                  <h3 className="font-bold">Crie suas tarefas</h3>

                  <p className="mt-1 text-sm leading-6 text-purple-100">
                    Adicione rapidamente tudo o que você precisa realizar.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 font-bold">
                  02
                </div>

                <div>
                  <h3 className="font-bold">Defina suas prioridades</h3>

                  <p className="mt-1 text-sm leading-6 text-purple-100">
                    Organize sua rotina e saiba exatamente onde concentrar sua
                    atenção.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 font-bold">
                  03
                </div>

                <div>
                  <h3 className="font-bold">Acompanhe seu progresso</h3>

                  <p className="mt-1 text-sm leading-6 text-purple-100">
                    Marque suas tarefas como concluídas e veja sua evolução.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Task board */}
          <div className="rounded-[28px] bg-white p-5 shadow-2xl shadow-purple-950/30 sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-400">
                  Minhas tarefas
                </p>

                <h3 className="mt-1 text-2xl font-bold text-gray-900">
                  Esta semana
                </h3>
              </div>

              <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-xl font-medium text-purple-700 transition hover:bg-purple-200">
                +
              </button>
            </div>

            {/* Filters */}
            <div className="mt-6 flex gap-2 overflow-x-auto">
              <button className="rounded-full bg-purple-700 px-4 py-2 text-xs font-semibold text-white">
                Todas
              </button>

              <button className="rounded-full bg-gray-100 px-4 py-2 text-xs font-medium text-gray-500">
                Pendentes
              </button>

              <button className="rounded-full bg-gray-100 px-4 py-2 text-xs font-medium text-gray-500">
                Concluídas
              </button>
            </div>

            {/* Tasks */}
            <div className="mt-6 space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 rounded-2xl border border-gray-100 p-4 transition hover:border-purple-200 hover:bg-purple-50/50"
                >
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      task.completed
                        ? "bg-purple-700 text-white"
                        : "border-2 border-gray-200"
                    }`}
                  >
                    {task.completed && <span className="text-xs">✓</span>}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm font-semibold ${
                        task.completed
                          ? "text-gray-400 line-through"
                          : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </p>

                    <span className="mt-1 inline-block text-xs text-purple-600">
                      {task.category}
                    </span>
                  </div>

                  <button className="text-gray-300 transition hover:text-purple-600">
                    ⋮
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between rounded-2xl bg-purple-50 px-4 py-3">
              <span className="text-sm font-medium text-gray-500">
                2 de 4 concluídas
              </span>

              <span className="font-bold text-purple-700">50%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
