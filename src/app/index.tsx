import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../components/EmptyState";
import FilterBar from "../components/FilterBar";
import TodoHeader from "../components/TodoHeader";
import TodoItem from "../components/TodoItem";
import { useTodoActions } from "../hooks/useTodoActions";
import { useTodoFilter } from "../hooks/useTodoFilter";
import { useTodoSelectors } from "../hooks/useTodoSelectors";

// Tela principal da lista de tarefas
export default function Index() {

  // Integração com router para navegação, hooks de estado global e filtragem
  const router = useRouter();
  const { todoList, counts, sorted } = useTodoSelectors(); // acessa lista de tarefas e contagens
  const { toggleTodo, removeTodo } = useTodoActions(); // ações para marcar e remover tarefas
  const { filter, setFilter, filteredList } = useTodoFilter(sorted); // hook para filtragem

  // Estado local para controlar qual menu de item está aberto
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);

  // Alterna o menu de opções de cada item, garantindo que apenas um menu esteja aberto
  const handleToggleMenu = (id: string) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  // Renderiza cada item da lista usando componente TodoItem, passando callbacks e estado do menu
  const renderItem = ({ item }: { item: typeof todoList[number] }) => (
    <TodoItem
      item={item}
      onToggle={() => toggleTodo(item.id, item.completed)} // marca ou desmarca como concluído
      onRemove={() => removeTodo(item.id)} // remove tarefa
      onPress={() => router.push({ pathname: "/edit/[id]", params: { id: item.id } })} // navega para edição
      menuVisible={openMenuId === item.id} // mostra menu apenas se este item estiver ativo
      onToggleMenu={() => handleToggleMenu(item.id)}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-white">

      {/* Header com contagem de tarefas e botão de criar nova tarefa */}
      <View className="px-6 pt-6 flex-row justify-between items-center">
        <TodoHeader counts={counts} />

        <TouchableOpacity
          onPress={() => router.push("/new")}
          className="bg-purple-600 px-4 py-2 rounded-full"
        >
          <Text className="text-white font-semibold">+ Nova tarefa</Text>
        </TouchableOpacity>
      </View>

      {/* Filtro de tarefas: todas, ativas, concluídas */}
      <FilterBar filter={filter} setFilter={setFilter} />
      
      {/* Lista de tarefas filtradas */}
      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<EmptyState />}
        ItemSeparatorComponent={() => <View className="h-2" />}
        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
      />
    </SafeAreaView>
  );
}
