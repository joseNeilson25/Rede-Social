"use client";

import { Camera } from "lucide-react";
import { MediaPicker } from "./MediaPicker";
import { FormEvent, useState } from "react";
import { api } from "@/lib/api";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";

interface DecodedToken {
  sub?: string;
  email?: string;
  name?: string;
  iat?: number;
  exp?: number;
  [key: string]: any;
}

export function NewMemoryForm() {
  const router = useRouter();
  const token = Cookie.get("token");
  const [isPublic, setIsPublic] = useState(false);
  
  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const fileToUpload = formData.get("coverUrl");

    let coverUrl = "";

    if (fileToUpload) {
      const uploadFormData = new FormData();
      uploadFormData.set("file", fileToUpload);

      const uploadResponse = await api.post("/file", uploadFormData);

      coverUrl = uploadResponse.data.fileUrl;
    }

    if (token) {
      const decodedToken: DecodedToken = jwt_decode(token);

      console.log("Valor do campo 'sub':", decodedToken.sub);

      await api.post(
        "/memories",
        {
          coverUrl,
          content: formData.get("content"),
          isPublic,
          userId: decodedToken.sub,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push("/");
    }
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
        <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            checked={isPublic} // Define o estado atual do checkbox
            onChange={(e) => setIsPublic(e.target.checked)} // Atualiza o estado quando o checkbox é alterado
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memória pública
        </label>
      </div>

      <MediaPicker />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
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
