"use client";

import { Camera } from "lucide-react";
import { MediaPicker } from "./MediaPicker";
import { FormEvent } from "react";
import { api } from "@/lib/api";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

export function NewUserForm() {
  const router = useRouter();

  async function handleCreateUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const fileToUpload = formData.get("coverUrl");

    let coverUrl = "";

    if (fileToUpload) {
      const uploadFormData = new FormData();
      uploadFormData.set("file", fileToUpload);

      const uploadResponse = await api.post("/file", uploadFormData);

      coverUrl = uploadResponse.data.fileUrl;
      console.log(coverUrl);
    }

    await api.post(
      "/user",
      {
        githubId: formData.get("githubId"),
        name: formData.get("name"),
        login: formData.get("login"),
        coverUrl,
        email: formData.get("email"),
        password: formData.get("password"),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    router.push("/user/login");
  }

  return (
    <form onSubmit={handleCreateUser} className="flex flex-1 flex-col gap-2">
      <label
        htmlFor="media"
        className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
      >
        <Camera className="h-4 w-4" />
        Anexar mídia
      </label>
      <MediaPicker />
      <input
        name="githubId"
        placeholder="githubId"
        className="w-full m-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
      />
      <input
        name="name"
        placeholder="name"
        className="w-full m-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
      />
      <input
        name="login"
        placeholder="login"
        className="w-full m-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
      />
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
