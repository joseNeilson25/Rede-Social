"use client";
import { Camera } from "lucide-react";
import { MediaPicker } from "./MediaPicker";
import { FormEvent, useEffect, useState } from "react";
import { api } from "@/lib/api";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

type Memory = {
  id: string;
  content: string;
  coverUrl: string;
  isPublic: boolean;
};

interface DecodedToken {
  sub?: string;
  email?: string;
  name?: string;
  iat?: number;
  exp?: number;
  [key: string]: any;
}

export function UpdateMemoryForm({ memory }: { memory: Memory }) {
  var toggleImg: boolean;
  const memoryData = memory;
  const [content, setContent] = useState(memory.content);
  const [isPublic, setIsPublic] = useState(memory.isPublic);

  useEffect(() => {
    console.log(memoryData);
    if (memoryData) {
      console.log(memoryData.id);
    }
    toggleImg = false;
  }, [memoryData]);

  async function handleUpdateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = Cookie.get("token");

    let coverUrl = memoryData.coverUrl;
    const formData = new FormData(event.currentTarget);
    const fileToUpload = formData.get("coverUrl");

    if (toggleImg === true) {
      if (fileToUpload) {
        const uploadFormData = new FormData();
        uploadFormData.set("file", fileToUpload);
        const uploadResponse = await api.post("/upload", uploadFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        coverUrl = uploadResponse.data.fileUrl;
      }
    }

    if (token) {
      const decodedToken: DecodedToken = jwt_decode(token);
      await api.put(
        `/memories/${memoryData.id}`,
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
    }
  }

  const handleContentChange = (event: any) => {
    setContent(event.target.value);
  };

  function toggleImgStats() {
    toggleImg = true;
  }

  return (
    <form onSubmit={handleUpdateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          onClick={toggleImgStats}
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
            value="true"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memória pública
        </label>
      </div>

      <MediaPicker initialPreview={memoryData.coverUrl} />

      <textarea
        name="content"
        spellCheck={false}
        value={content}
        onChange={handleContentChange}
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