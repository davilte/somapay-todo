// Define a estrutura de uma tarefa individual
export interface TodoItemType {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

// Define a estrutura do store de tarefas
export interface TodoListType {
    todoList: Array<TodoItemType>; // lista de tarefas
    addTodo: (todo: Omit<TodoItemType, "id">) => void; // Adiciona uma nova tarefa (não precisa de id, pois será gerado)
    removeTodo: (id: string) => void; // Remove uma tarefa pelo id
    updateTodo: (id: string, updatedFields: Partial<TodoItemType>) => void; // Atualiza campos específicos de uma tarefa existente
}