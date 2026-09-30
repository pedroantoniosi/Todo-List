"use client";

import { FormEvent, useState } from "react";

import Auth from "@/components/auth/Auth";
import AuthButton from "@/components/auth/AuthButton";
import AuthInput from "@/components/auth/AuthInput";

export default function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message ?? "Não foi possível criar a conta.");
        return;
      }

      console.log("Cadastro realizado:", data);

      // Temporariamente vamos apenas confirmar
      // que o cadastro foi realizado com sucesso.
      alert("Conta criada com sucesso!");
    } catch {
      setError("Não foi possível conectar ao servidor.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Auth type="register" onSubmit={handleSubmit}>
      <AuthInput
        label="Nome Completo:"
        name="name"
        placeholder="Pedro Antonio"
      />

      <AuthInput
        label="Email:"
        name="email"
        type="email"
        placeholder="you@example.com"
      />

      <AuthInput
        label="Senha:"
        name="password"
        type="password"
        placeholder="••••••••"
      />

      <AuthInput
        label="Confirmar Senha:"
        name="confirmPassword"
        type="password"
        placeholder="••••••••"
      />

      <label className="flex cursor-pointer items-start gap-2 text-xs leading-5 text-black/40">
        <input
          type="checkbox"
          required
          className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-black/20 bg-black/5 accent-orange-400"
        />

        <span>
          Concordo com{" "}
          <a href="#" className="text-black/70 hover:text-orange-300">
            Termos de Serviço e
          </a>{" "}
          e{" "}
          <a href="#" className="text-black/70 hover:text-orange-300">
            Política de Privacidade
          </a>
          .
        </span>
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <AuthButton type="submit">
        {isLoading ? "Criando conta..." : "Criar Conta"}
      </AuthButton>

      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1 bg-black/10" />

        <span className="text-[10px] uppercase tracking-wider text-black/25"></span>

        <div className="h-px flex-1 bg-black/10" />
      </div>
    </Auth>
  );
}
