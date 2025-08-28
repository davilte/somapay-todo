import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTodoActions } from "../../hooks/useTodoActions";
import { useTodoSelectors } from "../../hooks/useTodoSelectors";

export default function EditTodoScreen() {
  // Pegamos o `id` da rota para saber qual tarefa será editada
  const { id } = useLocalSearchParams<{ id: string }>();

  // Acessamos a lista de tarefas e a função de atualização do Zustand
  const { todoList } = useTodoSelectors();
  const { updateTodo } = useTodoActions();

  const router = useRouter();

  // Encontramos a tarefa correspondente ao id; pode ser undefined se o id for inválido
  const todo = todoList.find((t) => t.id === id);

  // Inicializamos os estados locais com os valores atuais da tarefa ou strings vazias
  const [title, setTitle] = useState(todo?.title ?? "");
  const [description, setDescription] = useState(todo?.description ?? "");

  // Se a tarefa não existir, voltamos automaticamente para evitar erro de renderização
  useEffect(() => {
    if (!todo) {
      router.back();
    }
  }, [todo]);

  // Atualiza a tarefa e retorna para a tela anterior
  const handleSave = () => {
    if (!id) return;
    updateTodo(id, { title, description });
    router.back();
  };

  // Evita renderizar a tela caso a tarefa não exista
  if (!todo) return null;

  return (
    <SafeAreaView className="flex-1 bg-white px-6 py-6">
      {/* Botão de voltar que combina ícone e texto para melhor UX */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="mb-4 flex-row justify-start items-center"
      >
        <Text className="text-purple-600"><Ionicons name="chevron-back" size={18} className="" /></Text>
        <Text className="text-purple-600 font-semibold">Voltar</Text>
      </TouchableOpacity>

      {/* Título da tela */}
      <Text className="text-2xl font-bold mb-4">Editar Tarefa</Text>

      {/* Input para título da tarefa */}
      <TextInput
        className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
        placeholder="Título da tarefa"
        placeholderTextColor="gray"
        value={title}
        onChangeText={setTitle}
      />

      {/* Input para descrição, permite multiline para textos maiores */}
      <TextInput
        className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
        placeholder="Descrição"
        placeholderTextColor="gray"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      
      {/* Botão de salvar com destaque visual, chamando handleSave */}
      <TouchableOpacity
        onPress={handleSave}
        className="bg-purple-600 px-4 py-3 rounded-xl"
      >
        <Text className="text-white text-center font-semibold">Salvar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
