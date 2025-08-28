import { useCallback } from "react";
import { useTodoStore } from "../store/todoStore";

// Hook que agrupa ações para manipulação de tarefas usando o store do Zustand
export function useTodoActions() {

    // Acessa funções do store para adicionar, remover e atualizar tarefas
    const addTodo = useTodoStore((s) => s.addTodo);
    const removeTodo = useTodoStore((s) => s.removeTodo);
    const updateTodo = useTodoStore((s) => s.updateTodo);

    // Cria uma nova tarefa garantindo que o título não esteja vazio
    // Usa useCallback para não recriar a função a cada render
    const addNewTodo = useCallback(
        (params: { title: string; description?: string }) => {
            const { title, description = "" } = params;
            const trimmed = title.trim();
            if (!trimmed) return; // impede criação de tarefas sem título


            addTodo({
                title: trimmed,
                description,
                completed: false, // nova tarefa inicia como não concluída
            });
        },
        [addTodo]
    );

    // Alterna o estado de conclusão de uma tarefa
    const toggleTodo = useCallback(
        (id: string, currentCompleted: boolean) => {
            updateTodo(id, { completed: !currentCompleted });
        },
        [updateTodo]
    );


    return { addNewTodo, removeTodo, updateTodo, toggleTodo };
}