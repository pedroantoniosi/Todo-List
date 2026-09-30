"use client";

import Link from "next/link";
import { FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthProps {
  type: "login" | "register";
  children: ReactNode;
  onSubmit?: (
    event: FormEvent<HTMLFormElement>,
  ) => void | boolean | Promise<void | boolean>;
}

export default function Auth({ type, children, onSubmit }: AuthProps) {
  const router = useRouter();
  const isLogin = type === "login";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!onSubmit) {
      return;
    }

    const success = await onSubmit(event);

    if (isLogin && success) {
      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen flex items-center bg-fuchsia-300/40 p-2 sm:p-4">
      <div className="relative mx-auto w-full flex max-w-200 overflow-hidden rounded-2xl border border-black/15 bg-[#fcf7ff] shadow-2xl">
        <section className="relative flex w-full items-center justify-center px-6 py-12 sm:px-10 xl:px-20">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="mb-12 flex items-center gap-2 text-sm font-semibold text-black lg:hidden"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-black text-xs font-black text-white">
                T
              </span>
              Touri
            </Link>

            <div className="mb-8">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-black/35">
                {isLogin ? "Bem-vindo de volta" : "Comece agora"}
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
                {isLogin ? "Bem-vindo de volta!" : "Crie sua conta"}
              </h1>

              <p className="mt-3 text-sm leading-6 text-black/45">
                {isLogin
                  ? "Insira seus dados para acessar sua conta."
                  : "Crie sua conta e comece sua jornada conosco."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {children}
            </form>

            <div className="mt-8 text-center text-xs text-black/35">
              {isLogin ? (
                <>
                  Não tem uma conta ainda?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-black transition hover:text-orange-300"
                  >
                    Cadastre-se
                  </Link>
                </>
              ) : (
                <>
                  Já tem uma conta?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-black transition hover:text-orange-300"
                  >
                    Entre aqui
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
