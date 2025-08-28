import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useId } from "../hooks/useId";
import { TodoListType } from "../types/TodoTypes";
import { zustandStorage } from "./mmkv";

// Store principal de tarefas usando Zustand com persistência via MMKV
export const useTodoStore = create<TodoListType>()(persist((set) => ({
    todoList: [], // lista inicial vazia

    // Adiciona uma nova tarefa gerando um ID único
    addTodo: (todo) => set((state) => ({
        todoList: [...state.todoList, { ...todo, id: useId() }]
    })),

    // Remove uma tarefa pelo ID
    removeTodo: (id) => set((state) => ({
        todoList: state.todoList.filter((todo) => todo.id !== id)
    })),

    // Atualiza campos específicos de uma tarefa existente
    updateTodo: (id, updatedFields) => set((state) => ({
        todoList: state.todoList.map((t) => t.id === id ? { ...t, ...updatedFields } : t)
    }))
}), {
    name: "todo-list", // chave do storage persistente
    storage: createJSONStorage(() => zustandStorage)
    // usa MMKV como backend de armazenamento
}))