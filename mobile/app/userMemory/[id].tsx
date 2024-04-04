import dayjs from "dayjs";
import { Link, useRouter } from "expo-router";
import ptBR from "dayjs/locale/pt-br";
import { api } from "../../src/lib/api";
import Icon from "@expo/vector-icons/Feather";
import * as SecureStore from "expo-secure-store";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import NLWLogo from "../../src/assets/nlw-spacetime-logo.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

dayjs.locale(ptBR);

interface Memory {
  id: string;
  content: string;
  excerpt: string;
  coverUrl: string;
  createdAt: string;
}

export default function UserMemory() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { bottom, top } = useSafeAreaInsets();
  const [memory, setMemory] = useState<Memory | null>(null);

  useEffect(() => {
    loadMemory();
  }, []);

  async function loadMemory() {
    const token = await SecureStore.getItemAsync("token");

    const response = await api.get(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMemory(response.data);
  }

  async function deleteMemory() {
    const token = await SecureStore.getItemAsync("token");

    await api.delete(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    router.push("/memories");
  }

  async function editMemory() {
    router.push("/memories");
  }

  if (!memory) {
    return (
      <View className="flex-1 justify-center items-center text-white">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <NLWLogo />
        <TouchableOpacity
          className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
          onPress={deleteMemory}
        >
          <Icon name="trash" size={16} color="#fff" />
        </TouchableOpacity>

        <Link href={`/updateMemory/${memory.id}`} asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-blue-500">
            <Icon name="edit" size={16} color="#fff" />
          </TouchableOpacity>
        </Link>

        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-right" size={16} color="#fff" />
          </TouchableOpacity>
        </Link>
      </View>
      <View key={memory.id} className="space-y-4 mt-4">
        <View className="flex-row items-center gap-2">
          <View className="h-px w-5 bg-gray-50" />
          <Text className="font-body text-sm text-gray-100">
            {dayjs(memory.createdAt).format("D[ de ]MMMM[, ]YYYY")}
          </Text>
        </View>
        <View className="space-y-4 px-8">
          <Image
            source={{
              uri: memory.coverUrl,
            }}
            className="aspect-video w-full rounded-lg"
            alt=""
          />
          <Text className="font-body text-base leading-relaxed text-gray-100">
            {memory.content}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
