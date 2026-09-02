export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export type TodoFilter = 'todas' | 'pendentes' | 'concluidas';

export interface TodoEdit {
    id: number;
    title: string;
}