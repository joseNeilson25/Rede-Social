import { User } from "lucide-react";

export function SignIn() {
  return (
      <div className="flex items-center gap-3 text-left transition-colors ">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
          <User className="h-5 w-5 text-gray-500" />
        </div>
        <p>
          <a className="hover:text-gray-50 underline" href="user/new">
            Crie sua conta
          </a>
          {" "}ou{" "}
          <a className="hover:text-gray-50 underline" href="user/login">
            faça login
          </a>
          {" "}para salvar suas memórias
        </p>
      </div>
  );
}