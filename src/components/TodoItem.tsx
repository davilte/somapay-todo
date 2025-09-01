import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { LayoutRectangle, Pressable, Text, TouchableOpacity, View } from "react-native";
import { TodoItemType } from "../types/TodoTypes";

export interface TodoItemProps {
    item: TodoItemType;
    onToggle: (id: string, completed: boolean) => void;
    onRemove: (id: string) => void;
    onPress?: () => void;
    menuVisible: boolean;
    onToggleMenu: () => void;
}

// Componente que representa cada item da lista de tarefas
// Permite marcar como concluído, editar, remover e abrir um menu de opções
export default function TodoItem({ item, onToggle, onRemove, onPress, menuVisible, onToggleMenu }: TodoItemProps) {

    // Armazena layout do botão de menu para posicionar corretamente o popover
    const [buttonLayout, setButtonLayout] = useState<LayoutRectangle | null>(null);

    // Ao editar, fecha o menu e chama o callback de edição
    const handleEdit = () => {
        onToggleMenu();
        onPress?.();
    };

    // Ao deletar, fecha o menu e remove a tarefa
    const handleDelete = () => {
        onToggleMenu();
        onRemove(item.id);
    };

    return (
        <View className="mb-3 relative">
            {/* Item principal da tarefa */}
            <View className="flex-row justify-between items-center bg-gray-100 px-4 py-3 rounded-xl gap-x-2">

                {/* Área que marca como concluído ao clicar */}
                <TouchableOpacity
                    className="flex-row items-center flex-1"
                    onPress={() => onToggle(item.id, item.completed)}
                >
                    <Ionicons
                        name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                        size={24}
                        color={item.completed ? "green" : "gray"}
                    />
                    <View className="ml-3 flex-1">

                        {/* Título com linha cortada se concluído */}
                        <Text
                            className={`text-lg ${item.completed ? "line-through text-gray-500" : ""}`}
                            numberOfLines={1}
                        >
                            {item.title}
                        </Text>

                        {/* Mostra descrição apenas se existir */}
                        {!!item.description && (
                            <Text className="text-gray-600 text-sm" numberOfLines={2}>
                                {item.description}
                            </Text>
                        )}
                    </View>
                </TouchableOpacity>

                {/* Botão de menu para abrir popover */}
                <TouchableOpacity
                    onPress={onToggleMenu}
                    className="p-2"
                    onLayout={(e) => setButtonLayout(e.nativeEvent.layout)} // pega posição do botão
                >
                    <Ionicons name="ellipsis-vertical" size={24} color="gray" />
                </TouchableOpacity>
            </View>

            {/* Popover com opções Editar e Deletar */}
            {menuVisible && buttonLayout && (
                <Pressable className="absolute inset-0 z-50" onPress={onToggleMenu}>
                    <View
                        className="absolute bg-white rounded-xl shadow-lg"
                        style={{
                            // Posiciona o menu abaixo do botão, ajustando horizontalmente
                            top: buttonLayout.y + buttonLayout.height + 4,
                            left: buttonLayout.x - 80 + buttonLayout.width,
                            width: 120,
                            paddingVertical: 4,
                        }}
                    >

                        {/* Opção Editar */}
                        <TouchableOpacity
                            className="flex-row items-center px-3 py-2"
                            onPress={handleEdit}
                        >
                            <Ionicons name="pencil" size={18} color="black" className="mr-2" />
                            <Text>Editar</Text>
                        </TouchableOpacity>

                        {/* Opção Deletar */}
                        <TouchableOpacity
                            className="flex-row items-center px-3 py-2"
                            onPress={handleDelete}
                        >
                            <Ionicons name="trash" size={18} color="red" className="mr-2" />
                            <Text className="text-red-500">Excluir</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            )}
        </View>
    );
}
