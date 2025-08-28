import React from "react";
import { Text, View } from "react-native";

// Componente simples para exibir quando não há tarefas na lista
export default function EmptyState() {
    return (
        <View className="items-center justify-center py-20">
            <Text className="text-gray-500">Nenhuma tarefa ainda. Adicione a sua primeira acima.</Text>
        </View>
    );
}

