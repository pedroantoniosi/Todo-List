import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fcf7ff]">
      {/* Background decorations */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />
      <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-fuchsia-300/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-20 lg:px-8">
        <div className="grid w-full items-center gap-16 lg:grid-cols-2">
          {/* Text */}
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2 text-sm font-medium text-purple-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-purple-600" />
              Organize. Planeje. Conclua.
            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-gray-950 sm:text-6xl">
              Organize suas
              <span className="block bg-gradient-to-r from-purple-700 to-fuchsia-500 bg-clip-text text-transparent">
                tarefas de um jeito
              </span>
              simples.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-gray-500 sm:text-lg">
              Tenha suas tarefas organizadas em um só lugar. Planeje seu dia,
              acompanhe seu progresso e mantenha o foco no que realmente
              importa.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="rounded-full border border-purple-700 px-7 py-3.5 text-sm font-semibold text-purple-700 transition hover:bg-purple-50"
              >
                Entrar
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-gradient-to-r from-purple-700 to-fuchsia-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/30"
              >
                Criar conta
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm text-gray-400">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-white bg-purple-300" />
                <div className="h-8 w-8 rounded-full border-2 border-white bg-fuchsia-300" />
                <div className="h-8 w-8 rounded-full border-2 border-white bg-violet-400" />
              </div>

              <span>Organize seu dia com mais praticidade.</span>
            </div>
          </div>

          {/* Illustration / Dashboard */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Decorative circles */}
            <div className="absolute -right-2 top-4 h-5 w-5 rounded-full bg-purple-500" />
            <div className="absolute left-8 top-20 h-3 w-3 rounded-full bg-fuchsia-400" />
            <div className="absolute -bottom-5 right-16 h-4 w-4 rounded-full bg-purple-400" />

            {/* Main card */}
            <div className="relative w-full max-w-[500px] rounded-[32px] border border-white bg-gradient-to-br from-purple-700 via-purple-600 to-fuchsia-600 p-5 shadow-2xl shadow-purple-500/25">
              {/* Top */}
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-200">Olá 👋</p>
                  <h2 className="text-xl font-bold text-white">Suas tarefas</h2>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur">
                  ✓
                </div>
              </div>

              {/* Progress */}
              <div className="rounded-2xl bg-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      Progresso de hoje
                    </p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">75%</p>
                  </div>

                  <div className="relative h-14 w-14">
                    <div className="absolute inset-0 rounded-full border-4 border-purple-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-600 border-r-purple-600 rotate-45" />
                    <div className="flex h-full items-center justify-center text-xs font-bold text-purple-700">
                      6/8
                    </div>
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500" />
                </div>
              </div>

              {/* Tasks */}
              <div className="mt-4 space-y-3">
                {[
                  {
                    title: "Finalizar projeto",
                    time: "09:00",
                    done: true,
                  },
                  {
                    title: "Estudar TypeScript",
                    time: "14:00",
                    done: true,
                  },
                  {
                    title: "Revisar tarefas do dia",
                    time: "18:00",
                    done: false,
                  },
                ].map((task) => (
                  <div
                    key={task.title}
                    className="flex items-center gap-3 rounded-2xl bg-white/95 p-4"
                  >
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        task.done
                          ? "bg-purple-600 text-white"
                          : "border-2 border-gray-200"
                      }`}
                    >
                      {task.done && <span className="text-xs">✓</span>}
                    </div>

                    <div className="flex-1">
                      <p
                        className={`text-sm font-semibold ${
                          task.done
                            ? "text-gray-400 line-through"
                            : "text-gray-800"
                        }`}
                      >
                        {task.title}
                      </p>

                      <p className="mt-0.5 text-xs text-gray-400">
                        Hoje às {task.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add task */}
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                <span className="text-lg">+</span>
                Nova tarefa
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
