"use client";

import { FormEvent } from "react";
import { api } from "@/lib/api";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

export function Login() {
  const router = useRouter();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    const formData = new FormData(event.currentTarget);
  
    try {
      const response = await api.post(
        "/login",
        {
          email: formData.get("email"),
          password: formData.get("password"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const token = response.data.access_token
      Cookie.set('token', token, { expires: 1 })      
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  }
  

  return (
    <form onSubmit={handleLogin} className="flex flex-1 flex-col gap-2">
      <input
        name="email"
        placeholder="email"
        className="w-full m-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
      />
      <input
        name="password"
        placeholder="password"
        className="w-full m-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
      />

      <button
        type="submit"
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  );
}
