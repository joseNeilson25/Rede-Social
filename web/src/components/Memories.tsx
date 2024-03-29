"use client";

import React, { useEffect, useState } from "react";
import { EmptyMemories } from "@/components/EmptyMemories";
import { api } from "@/lib/api";
import Cookie from "js-cookie";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

dayjs.locale(ptBR);

interface Memory {
  id: string;
  coverUrl: string;
  excerpt: string;
  createdAt: string;
}

const Memories = () => {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const token = Cookie.get("token");
    if (!token) {
      return;
    }

    const fetchMemories = async () => {
      const response = await api.get("/user-memories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMemories(response.data);
    };

    fetchMemories();
  }, []);

  if (memories.length === 0) {
    return <EmptyMemories />;
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => (
        <div key={memory.id} className="space-y-4">
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(memory.createdAt).format("D[ de ]MMMM[, ]YYYY")}
          </time>
          <Image
            src={memory.coverUrl}
            alt=""
            width={592}
            height={280}
            className="aspect-video w-full rounded-lg object-cover"
          />
          <p className="text-lg leading-relaxed text-gray-100">
            {memory.excerpt}
          </p>
          <Link
            href={`/memories/${memory.id}`}
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
          >
            Detalhes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Memories;
