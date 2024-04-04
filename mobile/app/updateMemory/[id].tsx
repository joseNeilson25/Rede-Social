import {
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/Feather";

import { api } from "../../src/lib/api";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import NLWLogo from "../../src/assets/nlw-spacetime-logo.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState, FormEvent } from "react";

type Memory = {
  id: string;
  content: string;
  coverUrl: string;
  isPublic: boolean;
};

export default function UpdateMemory() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const { bottom, top } = useSafeAreaInsets();
  const [isPublic, setIsPublic] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const params = useLocalSearchParams();
  const { id } = params;

  const [memory, setMemory] = useState<Memory | null>(null);

  console.log(id);

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

    const memoryData = response.data;
    setMemory(memoryData);

    setContent(memoryData.content);
    setCoverUrl(memoryData.coverUrl);
    setIsPublic(memoryData.isPublic);
    setPreview(memoryData.coverUrl);
  }

  async function openImagePicker() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.assets[0]) {
        setPreview(result.assets[0].uri);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleEditMemory(): Promise<void> {
    const token = await SecureStore.getItemAsync("token");

    const contentValue = content;
    const coverUrlValue = coverUrl;
    const isPublicValue = isPublic;

    if (preview) {
      // TRATAR, CASO O USUARIO QUEIRA TROCAR A IMAGEM
    }
    const idString = Array.isArray(id) ? id[0] : id;
    const updatedMemory = {
      ...memory,
      coverUrl, coverUrlValue,
      content: contentValue,
      isPublic: isPublicValue,
      id: idString,
    };

    await api.patch(`/memories/${id}`, updatedMemory, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMemory(updatedMemory);
    router.push("/memories");
  }


  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <NLWLogo />
        <Link href={`/memories/${id}`} asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#fff" />
          </TouchableOpacity>
        </Link>
      </View>
      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{ false: "#767577", true: "#372560" }}
            thumbColor={isPublic ? "#9b79ea" : "#9e9ea0"}
          />

          <Text className="font-body text-base text-gray-200">
            Tornar memória pública
          </Text>
        </View>
        <Text className="font-body text-base text-gray-200">
            {preview}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={openImagePicker}
          className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
        >
          {preview ? (
            <Image
              source={{ uri: preview }}
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <View className="flex-row items-center gap-2">
              <Icon name="image" color="#fff" />
              <Text className="text-sm font-bold text-gray-200">
                Adicionar foto ou vídeo de capa
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          multiline
          value={content}
          onChangeText={(text) => setContent(text)}
          textAlignVertical="top"
          className="p-0 font-body text-lg text-gray-50"
          placeholderTextColor="#56565a"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleEditMemory}
          className="items-center self-end rounded-full bg-green-500 px-5 py-2"
        >
          <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
