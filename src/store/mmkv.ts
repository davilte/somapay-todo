import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware/persist";

export const storage = new MMKV({
    id: "todo-list",
});

export const zustandStorage: StateStorage = {
    setItem: (name: string, value: string) => {
        storage.set(name, value);
    },
    getItem: (name: string) => {
        const value = storage.getString(name);
        return value ?? null;
    },
    removeItem: (name: string) => {
        storage.delete(name);
    }
}