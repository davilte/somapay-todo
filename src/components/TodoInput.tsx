import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export interface TodoInputProps {
    onSubmit: (payload: { title: string; description?: string }) => void;
}

// Componente de input para criar uma nova tarefa com título e descrição opcional
// Recebe callback onSubmit para enviar os dados para o componente pai
export default function TodoInput({ onSubmit }: TodoInputProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Adiciona a tarefa chamando onSubmit e reseta os campos
    const handleAdd = () => {
        onSubmit({ title, description });
        setTitle("");
        setDescription("");
    };

    return (
        <View className="mb-6">
            {/* Input e botão de adicionar em linha */}
            <View className="flex-row items-center mb-3">
                <TextInput
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 mr-2"
                    placeholder="New task title..."
                    value={title}
                    onChangeText={setTitle}
                    returnKeyType="done"
                    onSubmitEditing={handleAdd}
                />
                <TouchableOpacity
                    className="bg-purple-600 px-4 py-2 rounded-xl"
                    onPress={handleAdd}
                    accessibilityLabel="Add task"
                >
                    <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Input para descrição opcional, multiline */}
            <TextInput
                className="border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Optional description..."
                value={description}
                onChangeText={setDescription}
                multiline
            />
        </View>
    );
}