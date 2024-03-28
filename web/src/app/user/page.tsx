import { api } from "@/lib/api";
import Image from "next/image";
import { cookies } from "next/headers";
import { getUser } from "@/lib/auth";
import Link from "next/link";
import { Edit } from "lucide-react";

export default async function User() {
  const { name, avatarUrl, sub } = getUser();
  const token = cookies().get("token")?.value;

  const user = await api.get(`/users/${sub}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <div>
      <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center gap-3 text-left">
          <Image
            src={avatarUrl}
            width={40}
            height={40}
            alt=""
            className="h-10 w-10 rounded-full"
          />
          <p className="max-w-[140px] text-sm leading-snug">{name}</p>
        </div>
        <Link
          href={`/user/edit/${sub}`}
          className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
        >
          <Edit className="h-4 w-4" />
          Editar Bio
        </Link>
      </div>
      <p className="text-sm leading-snug mt-3">{user.data.bio}</p>
    </div>
  );
}
