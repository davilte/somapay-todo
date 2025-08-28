import React from "react";
import { Text, View } from "react-native";

export interface TodoHeaderProps {
    title?: string;
    subtitle?: string;
    counts?: { total: number; completed: number; pending: number };
}

// Componente de header da lista de tarefas
// Recebe título, subtítulo e contagem de tarefas (total, concluídas, pendentes)
export default function TodoHeader({
    title = "To-Do List",
    subtitle = "Lista de tarefas",
    counts,
}: TodoHeaderProps) {
    return (
        <View className="mb-6">
            {/* Título principal */}
            <Text className="text-2xl font-bold">{title}</Text>

            {/* Subtítulo descritivo */}
            <Text className="text-gray-700">{subtitle}</Text>

            {/* Mostra resumo das tarefas apenas se counts estiver definido */}
            {counts && (
                <Text className="text-gray-500 mt-1">
                    {counts.pending} ativas • {counts.completed} concluídas • {counts.total} total
                </Text>
            )}
        </View>
    );
}