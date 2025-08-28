import { useMemo } from "react";
import { useTodoStore } from "../store/todoStore";

// Hook para acessar dados derivados do store de tarefas
export function useTodoSelectors() {
    const todoList = useTodoStore((s) => s.todoList); // pega a lista completa de tarefas

    // Calcula contagens derivadas: total, concluídas e pendentes
    // useMemo evita recalcular em cada render desnecessariamente
    const counts = useMemo(() => {
        const total = todoList.length;
        const completed = todoList.filter((t) => t.completed).length;
        const pending = total - completed;
        return { total, completed, pending };
    }, [todoList]);

    // Lista de tarefas ordenadas: tarefas pendentes primeiro
    const sorted = useMemo(() => {
        return [...todoList].sort((a, b) => Number(a.completed) - Number(b.completed));
    }, [todoList]);


    return { todoList, counts, sorted }; // expõe lista original, contagens e lista ordenada
}