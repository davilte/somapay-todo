import { useMemo, useState } from "react";
import { TodoItemType } from "../types/TodoTypes";

export type TodoFilter = "todas" | "ativas" | "concluidas";

// Hook para gerenciar filtragem de tarefas
// Permite alternar entre todas, apenas ativas ou apenas concluídas
export function useTodoFilter(todoList: TodoItemType[]) {
  const [filter, setFilter] = useState<TodoFilter>("todas");

  // Lista filtrada recalculada apenas quando filter ou todoList mudam
  const filteredList = useMemo(() => {
    switch (filter) {
      case "ativas":
        return todoList.filter((t) => !t.completed); // retorna apenas tarefas não concluídas
      case "concluidas":
        return todoList.filter((t) => t.completed); // retorna apenas tarefas concluídas
      default:
        return todoList; // caso "todas", retorna a lista completa
    }
  }, [filter, todoList]);

  return { filter, setFilter, filteredList }; // expõe estado e lista filtrada
}
