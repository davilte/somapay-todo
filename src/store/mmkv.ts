import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware/persist";

// Configuração do MMKV para persistência local de dados
// Usado para armazenar a lista de tarefas de forma eficiente
export const storage = new MMKV({
    id: "todo-list", // identificador do storage
});

// Adapter para integrar o MMKV com o middleware de persistência do Zustand
export const zustandStorage: StateStorage = {
    setItem: (name: string, value: string) => {
        storage.set(name, value); // salva valor no MMKV
    },
    getItem: (name: string) => {
        const value = storage.getString(name); // lê valor do MMKV
        return value ?? null; // retorna null se não houver valor
    },
    removeItem: (name: string) => {
        storage.delete(name); // remove valor do MMKV
    }
}