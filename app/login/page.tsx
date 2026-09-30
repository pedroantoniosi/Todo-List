"use client";

import { FormEvent, useState } from "react";
import Auth from "@/components/auth/Auth";
import AuthButton from "@/components/auth/AuthButton";
import AuthInput from "@/components/auth/AuthInput";

export default function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<boolean> {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message ?? "Não foi possível fazer login.");
        return false;
      }

      localStorage.setItem("token", data.token);

      alert("Login realizado com sucesso!");

      return true;
    } catch {
      setError("Não foi possível conectar ao servidor.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Auth type="login" onSubmit={handleSubmit}>
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

      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-xs text-black/40">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 rounded border-black/20 bg-black/5"
          />
          Me Lembrar
        </label>

        <a
          href="#"
          className="text-xs text-black/50 transition hover:text-orange-300"
        >
          Esqueceu a senha?
        </a>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <AuthButton type="submit">
        {isLoading ? "Entrando..." : "Login"}
      </AuthButton>

      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1 bg-black/10" />
        <div className="h-px flex-1 bg-black/10" />
      </div>
    </Auth>
  );
}
