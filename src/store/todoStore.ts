import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TodoListType } from "../types/TodoTypes";
import { zustandStorage } from "./mmkv";

export const useTodoList = create<TodoListType>()(persist((set) => ({
    todoList: [],
    addTodo: (todo) => set((state) => ({
        todoList: [...state.todoList, todo]
    })),
    removeTodo: (id) => set((state) => ({
        todoList: state.todoList.filter((todo) => todo.id !== id)
    })),
    updateTodo: (id, todo) => set((state) => ({
        todoList: state.todoList.map((t) => t.id === id ? todo : t)
    }))
}), {
    name: "todo-list",
    storage: createJSONStorage(() => zustandStorage)
}))