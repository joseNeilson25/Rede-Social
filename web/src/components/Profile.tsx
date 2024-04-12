import { api } from "@/lib/api";
import { getUser } from "@/lib/auth";
import Image from "next/image";
import { cookies } from 'next/headers'

export async function Profile() {
  const { name, sub } = getUser();
  
  const token = cookies().get('token')?.value

  const response = await api.get(`/user/${sub}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return (
    <div className="flex items-center gap-3 text-left">
      <a href="/user" className="block text-red-400 hover:text-red-300">
        <Image
          src={response.data.coverUrl}
          width={40}
          height={40}
          alt=""
          className="h-10 w-10 rounded-full"
        />
      </a>

      <p className="max-w-[140px] text-sm leading-snug">
        {name}
        <a
          href="/api/auth/logout"
          className="block text-red-400 hover:text-red-300"
        >
          Quero sair
        </a>
      </p>
    </div>
  );
}
