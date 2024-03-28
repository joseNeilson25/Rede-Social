"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { UpdateUserForm } from "@/components/UpdateUserForm";
import Cookie from "js-cookie";

export default function UpdateUser(context: any) {
  const [user, setUser] = useState(null);
  const token = Cookie.get("token");

  useEffect(() => {
    const fetchUser = async () => {
      const { params } = context;

      const id = params.slug;
      try {
        const response = await api.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/user"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar ao seu perfil
      </Link>

      {user && <UpdateUserForm user={user} />}
    </div>
  );
}
