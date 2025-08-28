import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTodoActions } from "../hooks/useTodoActions";

// Tela para criar uma nova tarefa
export default function NewTodoScreen() {

  // Integração com router e hook de ações para adicionar tarefas
  const { addNewTodo } = useTodoActions();
  const router = useRouter();

  // Estados locais para título e descrição da nova tarefa
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Função que adiciona a nova tarefa e volta para a tela anterior
  const handleSave = () => {
    addNewTodo({ title, description });
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 py-6">

      {/* Botão de voltar com ícone para melhor UX */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="mb-4 flex-row justify-start items-center"
      >
        <Text className="text-purple-600"><Ionicons name="chevron-back" size={18} className="" /></Text>
        <Text className="text-purple-600 font-semibold">Voltar</Text>
      </TouchableOpacity>

      {/* Título da tela */}
      <Text className="text-2xl font-bold mb-4">Nova Tarefa</Text>

      {/* Input controlado para título da tarefa */}
      <TextInput
        className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
        placeholder="Título da tarefa"
        placeholderTextColor="gray"
        value={title}
        onChangeText={setTitle}
      />

      {/* Input para descrição opcional, multiline para textos maiores */}
      <TextInput
        className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
        placeholder="Descrição (opcional)"
        placeholderTextColor="gray"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Botão de salvar a nova tarefa */}
      <TouchableOpacity
        onPress={handleSave}
        className="bg-purple-600 px-4 py-3 rounded-xl"
      >
        <Text className="text-white text-center font-semibold">Salvar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
