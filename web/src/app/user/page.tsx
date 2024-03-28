import { api } from "@/lib/api";
import Image from "next/image";
import { cookies } from "next/headers";
import { getUser } from "@/lib/auth";

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
      <p className="text-sm leading-snug mt-3">{user.data.bio}</p>
    </div>
  );
}
