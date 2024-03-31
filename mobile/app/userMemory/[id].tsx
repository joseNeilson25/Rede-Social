import dayjs from "dayjs";
import { Link } from "expo-router";
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
  coverUrl: string;
  excerpt: string;
  content: string;
  createdAt: string;
  id: string;
}

export default function UserMemory() {
  const { bottom, top } = useSafeAreaInsets();

  useEffect(() => {
    loadMemory();
  }, []);

  const { id } = useLocalSearchParams();
  const [memory, setMemory] = useState<Memory | null>(null);

  async function loadMemory() {
    const token = await SecureStore.getItemAsync("token");

    const response = await api.get(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMemory(response.data);
  }

  if (!memory) {
    return (
      <View className="flex-1 justify-center content-center ">
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
        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#fff" />
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
