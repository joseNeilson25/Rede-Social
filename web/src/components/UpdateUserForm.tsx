"use client";
import { FormEvent, useEffect, useState } from "react";
import { api } from "@/lib/api";
import Cookie from "js-cookie";

type User = {
  id: string;
  bio: string;
  name: string;
  coverUrl: string;
};

export function UpdateUserForm({ user }: { user: User }) {
  const [bio, setBio] = useState(user.bio);
  const userData = user;

  useEffect(() => {
    console.log(userData);
    if (userData) {
      console.log(userData.id);
    }

  }, [userData])

  async function handleUpdateUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = Cookie.get("token");

    const formData = new FormData(event.currentTarget);


    await api.patch(
      `/users/${userData.id}`,
      {
        bio: formData.get("bio"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  const handleBioChange = (event: any) => {
    setBio(event.target.value);
  };

  return (
    <form onSubmit={handleUpdateUser} className="flex flex-1 flex-col gap-2">
      <textarea
        name="bio"
        spellCheck={false}
        value={bio}
        onChange={handleBioChange}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      <button
        type="submit"
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Atualizar
      </button>
    </form>
  );
}