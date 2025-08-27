export interface TodoItemType {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

export interface TodoListType {
    todoList: Array<TodoItemType>;
    addTodo: (todo: TodoItemType) => void;
    removeTodo: (id: string) => void;
    updateTodo: (id: string, todo: TodoItemType) => void;
}