import { Text, TouchableOpacity, View } from "react-native";

interface FilterBarProps {
    filter: "todas" | "ativas" | "concluidas";
    setFilter: (f: "todas" | "ativas" | "concluidas") => void;
}

export default function FilterBar({ filter, setFilter }: FilterBarProps) {
    return (
        <View className="flex-row justify-center gap-x-2 px-6 mb-4 mt-4">
            {(["todas", "ativas", "concluidas"] as const).map((f) => (
                <TouchableOpacity
                    key={f}
                    onPress={() => setFilter(f)}
                    className={`px-4 py-2 rounded-full ${filter === f ? "bg-purple-600" : "bg-gray-200"}`}
                >
                    <Text className={`font-medium ${filter === f ? "text-white" : "text-gray-700"}`}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
